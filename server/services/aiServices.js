import natural from "natural"
import {pipeline} from '@xenova/transformers'

class AIService {
  constructor() {
    this.embedder = null;
    this.tokenizer = new natural.WordTokenizer();
    this.stemmer = natural.PorterStemmer;
    this.initialized = false;
    
    // Smart labeling rules for different domains
    this.labelingRules = {
      technology: ['software', 'computer', 'digital', 'tech', 'system', 'data', 'algorithm', 'network'],
      science: ['research', 'study', 'analysis', 'experiment', 'theory', 'scientific', 'method'],
      business: ['market', 'strategy', 'customer', 'revenue', 'profit', 'management', 'company'],
      education: ['learning', 'student', 'knowledge', 'skill', 'teaching', 'education', 'training'],
      health: ['health', 'medical', 'treatment', 'patient', 'disease', 'therapy', 'care'],
      environment: ['climate', 'environment', 'nature', 'pollution', 'sustainability', 'green'],
      psychology: ['behavior', 'mind', 'emotion', 'cognitive', 'mental', 'psychology', 'brain']
    };
    
    this.categoryColors = {
      technology: '#3b82f6',
      science: '#10b981', 
      business: '#f59e0b',
      education: '#8b5cf6',
      health: '#ef4444',
      environment: '#22c55e',
      psychology: '#ec4899',
      general: '#6b7280'
    };
  }

  async initialize() {
    try {
      console.log('🔄 Initializing embedding model for production...');
      this.embedder = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
      this.initialized = true;
      console.log('✅ Production embedding model loaded successfully');
    } catch (error) {
      console.error('❌ Failed to initialize AI service:', error);
      throw error;
    }
  }

  // Enhanced concept extraction with better NLP
  extractConcepts(text) {
    const sentences = text.match(/[^\.!?]+[\.!?]+/g) || [text];
    const concepts = [];
    
    sentences.forEach((sentence, index) => {
      // Clean and tokenize
      const cleanSentence = sentence.replace(/[^\w\s]/g, ' ').toLowerCase();
      const tokens = this.tokenizer.tokenize(cleanSentence);
      
      // Filter meaningful tokens
      const meaningfulTokens = tokens.filter(token => 
        token.length > 2 && 
        !natural.stopwords.includes(token) &&
        !/^\d+$/.test(token) &&
        token.length < 20
      );

      // Extract key phrases using advanced patterns
      const phrases = this.extractAdvancedPhrases(sentence);
      const namedEntities = this.extractNamedEntities(sentence);
      const technicalTerms = this.extractTechnicalTerms(sentence);

      // Score tokens by TF-IDF-like approach
      const scoredTokens = this.scoreTokens(meaningfulTokens, text);
      
      if (meaningfulTokens.length > 0) {
        concepts.push({
          id: `concept-${index}`,
          text: sentence.trim(),
          phrases: [...new Set([...phrases, ...namedEntities, ...technicalTerms])],
          terms: scoredTokens.slice(0, 8),
          category: this.detectCategory(sentence),
          originalIndex: index,
          importance: this.calculateImportance(sentence, meaningfulTokens)
        });
      }
    });

    return concepts.filter(c => c.importance > 0.3); // Filter low-importance concepts
  }

  // Advanced phrase extraction
  extractAdvancedPhrases(text) {
    const phrases = [];
    
    // Pattern 1: Capitalized noun phrases
    const capitalizedPhrases = text.match(/\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\b/g) || [];
    phrases.push(...capitalizedPhrases);

    // Pattern 2: Technical compound words
    const compoundWords = text.match(/\b[a-z]+[-][a-z]+\b/gi) || [];
    phrases.push(...compoundWords);

    // Pattern 3: Process/action phrases (verb + noun)
    const actionPhrases = text.match(/\b(develop|create|implement|analyze|process|manage|design|build)\s+\w+/gi) || [];
    phrases.push(...actionPhrases);

    // Pattern 4: Scientific terms
    const scientificTerms = text.match(/\b\w+(?:ology|tion|sion|ment|ness|ity|ism|osis)\b/gi) || [];
    phrases.push(...scientificTerms);

    // Pattern 5: Numbers with units
    const measurements = text.match(/\b\d+(?:\.\d+)?\s*(?:percent|%|kg|meters?|years?|times?|degrees?)\b/gi) || [];
    phrases.push(...measurements);

    return [...new Set(phrases)].slice(0, 12);
  }

  // Extract named entities (simple pattern-based)
  extractNamedEntities(text) {
    const entities = [];
    
    // Organizations/Companies (ends with Inc, Corp, Ltd, etc.)
    const orgs = text.match(/\b[A-Z][A-Za-z\s]+(?:Inc|Corp|Ltd|LLC|Company|Organization)\b/g) || [];
    entities.push(...orgs);

    // Technologies/Protocols
    const tech = text.match(/\b(?:HTTP|API|JSON|XML|SQL|HTML|CSS|JavaScript|Python|React|Node\.js|AI|ML)\b/gi) || [];
    entities.push(...tech);

    // Dates and time periods
    const dates = text.match(/\b(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{4}|\b\d{4}\b/g) || [];
    entities.push(...dates);

    return entities;
  }

  // Extract technical terms
  extractTechnicalTerms(text) {
    const terms = [];
    
    // Look for domain-specific terminology
    const patterns = [
      /\b(?:algorithm|database|framework|architecture|protocol|interface)\w*\b/gi,
      /\b(?:analysis|research|methodology|hypothesis|correlation)\w*\b/gi,
      /\b(?:optimization|performance|efficiency|scalability)\w*\b/gi,
      /\b(?:machine learning|artificial intelligence|neural network|deep learning)\b/gi
    ];

    patterns.forEach(pattern => {
      const matches = text.match(pattern) || [];
      terms.push(...matches);
    });

    return [...new Set(terms)];
  }

  // Score tokens by frequency and position
  scoreTokens(tokens, fullText) {
    const allTokens = this.tokenizer.tokenize(fullText.toLowerCase());
    const tokenFreq = {};
    
    // Calculate frequency
    allTokens.forEach(token => {
      tokenFreq[token] = (tokenFreq[token] || 0) + 1;
    });

    // Score and sort tokens
    return tokens
      .map(token => ({
        token,
        score: tokenFreq[token] * (token.length > 6 ? 1.5 : 1)
      }))
      .sort((a, b) => b.score - a.score)
      .map(item => item.token);
  }

  // Detect content category
  detectCategory(text) {
    const lowercaseText = text.toLowerCase();
    let maxScore = 0;
    let detectedCategory = 'general';

    Object.entries(this.labelingRules).forEach(([category, keywords]) => {
      const score = keywords.reduce((sum, keyword) => {
        return sum + (lowercaseText.includes(keyword) ? 1 : 0);
      }, 0);

      if (score > maxScore) {
        maxScore = score;
        detectedCategory = category;
      }
    });

    return detectedCategory;
  }

  // Calculate concept importance
  calculateImportance(sentence, tokens) {
    let importance = 0.5; // Base importance
    
    // Length factor
    importance += Math.min(tokens.length * 0.05, 0.3);
    
    // Capitalization factor
    const capitalizedWords = (sentence.match(/\b[A-Z][a-z]+/g) || []).length;
    importance += capitalizedWords * 0.1;
    
    // Technical terms factor
    const technicalPattern = /\b(?:algorithm|system|process|method|analysis|research|development|implementation|technology|innovation)\b/gi;
    const technicalMatches = (sentence.match(technicalPattern) || []).length;
    importance += technicalMatches * 0.15;
    
    // Question/definition factor
    if (sentence.includes('?') || sentence.toLowerCase().includes('is ') || sentence.toLowerCase().includes('are ')) {
      importance += 0.2;
    }

    return Math.min(importance, 1.0);
  }

  // Get embeddings (same as before)
  async getEmbeddings(texts) {
    if (!this.initialized) {
      throw new Error('AI service not initialized');
    }

    try {
      const embeddings = [];
      for (const text of texts) {
        const result = await this.embedder(text, { pooling: 'mean', normalize: true });
        embeddings.push(Array.from(result.data));
      }
      return embeddings;
    } catch (error) {
      console.error('Error generating embeddings:', error);
      throw error;
    }
  }

  // Enhanced clustering with dynamic threshold
  clusterConcepts(concepts, embeddings, baseThreshold = 0.65) {
    const clusters = [];
    const assigned = new Set();

    // Sort concepts by importance (most important first)
    const sortedIndices = concepts
      .map((concept, index) => ({ concept, index, importance: concept.importance }))
      .sort((a, b) => b.importance - a.importance)
      .map(item => item.index);

    sortedIndices.forEach(i => {
      if (assigned.has(i)) return;

      const cluster = {
        id: `cluster-${clusters.length}`,
        mainConcept: concepts[i],
        relatedConcepts: [],
        centroid: embeddings[i],
        category: concepts[i].category,
        importance: concepts[i].importance
      };

      assigned.add(i);

      // Adjust threshold based on concept importance
      const threshold = baseThreshold - (concepts[i].importance * 0.1);

      // Find similar concepts
      for (let j = 0; j < concepts.length; j++) {
        if (assigned.has(j) || i === j) continue;

        const similarity = this.cosineSimilarity(embeddings[i], embeddings[j]);
        
        // Consider both semantic similarity and category match
        const categoryBonus = concepts[i].category === concepts[j].category ? 0.05 : 0;
        const adjustedSimilarity = similarity + categoryBonus;

        if (adjustedSimilarity > threshold && cluster.relatedConcepts.length < 4) {
          cluster.relatedConcepts.push({
            concept: concepts[j],
            similarity: similarity
          });
          assigned.add(j);
        }
      }

      clusters.push(cluster);
    });

    return clusters.filter(cluster => 
      cluster.importance > 0.4 || cluster.relatedConcepts.length > 0
    );
  }

  // Smart rule-based labeling (no external LLM needed)
  async generateLabels(clusters) {
    const labeledClusters = clusters.map(cluster => {
      const label = this.generateSmartLabel(cluster);
      return {
        ...cluster,
        label
      };
    });

    return labeledClusters;
  }

  // Generate labels using smart rules
  generateSmartLabel(cluster) {
    const mainConcept = cluster.mainConcept;
    const allConcepts = [mainConcept, ...cluster.relatedConcepts.map(rc => rc.concept)];
    
    // Strategy 1: Use best phrase from main concept
    if (mainConcept.phrases.length > 0) {
      const bestPhrase = mainConcept.phrases
        .filter(phrase => phrase.length > 3 && phrase.length < 25)
        .sort((a, b) => b.length - a.length)[0];
      
      if (bestPhrase) {
        return this.cleanLabel(bestPhrase);
      }
    }

    // Strategy 2: Use category-based common theme
    const categoryTerms = allConcepts
      .flatMap(concept => concept.terms)
      .filter(term => this.labelingRules[cluster.category]?.includes(term.toLowerCase()));

    if (categoryTerms.length > 0) {
      const mostCommon = this.getMostFrequent(categoryTerms);
      return this.cleanLabel(this.capitalizeWords(mostCommon));
    }

    // Strategy 3: Use most frequent meaningful term
    const allTerms = allConcepts.flatMap(concept => concept.terms);
    const meaningfulTerms = allTerms.filter(term => 
      term.length > 4 && 
      !['this', 'that', 'these', 'those', 'with', 'from', 'they'].includes(term)
    );

    if (meaningfulTerms.length > 0) {
      const bestTerm = this.getMostFrequent(meaningfulTerms);
      return this.cleanLabel(this.capitalizeWords(bestTerm));
    }

    // Strategy 4: Category-based fallback
    const categoryLabels = {
      technology: 'Technology',
      science: 'Research',
      business: 'Business',
      education: 'Learning',
      health: 'Healthcare',
      environment: 'Environment',
      psychology: 'Psychology',
      general: 'Concepts'
    };

    return categoryLabels[cluster.category] || 'Main Topic';
  }

  // Helper methods
  getMostFrequent(array) {
    const frequency = {};
    let maxCount = 0;
    let mostFrequent = array[0];

    array.forEach(item => {
      frequency[item] = (frequency[item] || 0) + 1;
      if (frequency[item] > maxCount) {
        maxCount = frequency[item];
        mostFrequent = item;
      }
    });

    return mostFrequent;
  }

  cleanLabel(label) {
    return label
      .replace(/[^\w\s-]/g, '')
      .trim()
      .substring(0, 20)
      .replace(/\b\w/g, l => l.toUpperCase());
  }

  capitalizeWords(str) {
    return str.replace(/\b\w/g, l => l.toUpperCase());
  }

  // Cosine similarity (same as before)
  cosineSimilarity(vec1, vec2) {
    let dotProduct = 0;
    let norm1 = 0;
    let norm2 = 0;

    for (let i = 0; i < vec1.length; i++) {
      dotProduct += vec1[i] * vec2[i];
      norm1 += vec1[i] * vec1[i];
      norm2 += vec2[i] * vec2[i];
    }

    return dotProduct / (Math.sqrt(norm1) * Math.sqrt(norm2));
  }

  // Enhanced mindmap conversion with better layout
  convertToMindmap(clusters, title) {
    const nodes = [];
    const edges = [];
    const centerX = 400;
    const centerY = 300;

    // Create central node
    const centralNode = {
      id: 'central-node',
      data: {
        label: title || 'Main Topic',
        category: 'central',
        color: '#1f2937',
        description: 'Central topic of the mindmap'
      },
      position: { x: centerX - 75, y: centerY - 25 },
      type: 'central'
    };
    nodes.push(centralNode);

    // Sort clusters by importance for better positioning
    const sortedClusters = clusters.sort((a, b) => b.importance - a.importance);

    // Create cluster nodes with smart layout
    const totalClusters = sortedClusters.length;
    const baseRadius = Math.max(200, totalClusters * 30);

    sortedClusters.forEach((cluster, index) => {
      const angle = (index * 2 * Math.PI) / totalClusters;
      const radius = baseRadius + (cluster.importance * 50);
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      // Main cluster node
      const clusterNode = {
        id: cluster.id,
        data: {
          label: cluster.label,
          category: cluster.category,
          color: this.categoryColors[cluster.category] || '#6b7280',
          description: cluster.mainConcept.text,
          importance: cluster.importance
        },
        position: { x: x - 75, y: y - 25 },
        type: 'cluster'
      };
      nodes.push(clusterNode);

      // Connect to central node
      edges.push({
        id: `edge-central-${cluster.id}`,
        source: 'central-node',
        target: cluster.id,
        type: 'main',
        label: cluster.importance > 0.8 ? 'High' : cluster.importance > 0.6 ? 'Med' : ''
      });

      // Create sub-nodes for related concepts (limit to top 3)
      const topRelated = cluster.relatedConcepts
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, 3);

      topRelated.forEach((relatedConcept, subIndex) => {
        const subAngle = angle + (subIndex - 1) * 0.4;
        const subRadius = radius + 120;
        const subX = centerX + subRadius * Math.cos(subAngle);
        const subY = centerY + subRadius * Math.sin(subAngle);

        const subNodeId = `${cluster.id}-sub-${subIndex}`;
        const subLabel = relatedConcept.concept.phrases[0] || 
                        relatedConcept.concept.terms[0] || 
                        'Related Concept';

        const subNode = {
          id: subNodeId,
          data: {
            label: this.cleanLabel(subLabel),
            category: 'sub-concept',
            color: this.lightenColor(this.categoryColors[cluster.category] || '#6b7280'),
            description: relatedConcept.concept.text,
            similarity: relatedConcept.similarity
          },
          position: { x: subX - 60, y: subY - 20 },
          type: 'sub'
        };
        nodes.push(subNode);

        // Connect sub-node to cluster node
        edges.push({
          id: `edge-${cluster.id}-${subNodeId}`,
          source: cluster.id,
          target: subNodeId,
          type: 'sub',
          label: `${Math.round(relatedConcept.similarity * 100)}%`
        });
      });
    });

    return { nodes, edges };
  }

  // Lighten color for sub-nodes (same as before)
  lightenColor(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    
    const newR = Math.min(255, r + 40);
    const newG = Math.min(255, g + 40);
    const newB = Math.min(255, b + 40);
    
    return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
  }

  // Main processing method (enhanced)
  async processMindmap(text, title) {
    const startTime = Date.now();
    
    try {
      console.log('🔄 Processing mindmap with production AI...');
      
      // Step 1: Enhanced concept extraction
      console.log('📝 Extracting concepts with advanced NLP...');
      const concepts = this.extractConcepts(text);
      console.log(`Found ${concepts.length} meaningful concepts`);
      
      if (concepts.length === 0) {
        throw new Error('No meaningful concepts found in the text');
      }

      // Step 2: Generate embeddings
      console.log('🧠 Generating semantic embeddings...');
      const conceptTexts = concepts.map(c => c.text);
      const embeddings = await this.getEmbeddings(conceptTexts);
      
      // Step 3: Smart clustering
      console.log('🔗 Clustering with importance weighting...');
      const clusters = this.clusterConcepts(concepts, embeddings);
      console.log(`Created ${clusters.length} clusters`);
      
      // Step 4: Generate smart labels
      console.log('🏷️ Generating labels with rule-based AI...');
      const labeledClusters = await this.generateLabels(clusters);
      
      // Step 5: Convert to optimized mindmap
      console.log('🗺️ Building mindmap structure...');
      const { nodes, edges } = this.convertToMindmap(labeledClusters, title);
      
      const processingTime = Date.now() - startTime;
      console.log(`✅ Mindmap processed successfully in ${processingTime}ms`);
      
      return {
        nodes,
        edges,
        metadata: {
          totalConcepts: concepts.length,
          clustersFound: clusters.length,
          processingTime,
          categories: [...new Set(nodes.map(n => n.data.category))],
          aiModel: 'production-hybrid',
          accuracy: 'high'
        }
      };
    } catch (error) {
      console.error('❌ Error processing mindmap:', error);
      throw error;
    }
  }
}



const aiService = new AIService();

const initializeAI = () => aiService.initialize();

export { aiService, initializeAI };

