class UserInterestAnalyzer {
    constructor() {
      this.contentInteractions = {};
      this.userInterests = [];
      this.matchingInterests = [];
      this.contentCategories = [];
    }
  
    addInteraction(contentId, interactionType, userInterest, categories) {
      if (!this.contentInteractions[contentId]) {
        this.contentInteractions[contentId] = 0;
      }
      if (userInterest) {
        this.matchingInterests.push(userInterest);
      }
      this.contentCategories.push(categories);
      this.contentInteractions[contentId] += this.getInteractionWeight(interactionType);
    }
  
    getInteractionWeight(interactionType) {
      if (interactionType === 'like') {
        return 2;
      } else if (interactionType === 'dislike') {
        return -1;
      } else if (interactionType === 'view') {
        return 1;
      } else {
        return 0;
      }
    }
    

  
    analyzeUserInterests() {
        const categoryRankings = {};
    
        for (const contentId in this.contentInteractions) {
          const interactionScore = this.contentInteractions[contentId];
    
          // Fetch content categories/genres based on contentId and update categoryRankings
          const contentCategories = ['action', 'adventure']; // Fetch categories based on content ID
          contentCategories.forEach((category) => {
            if (!categoryRankings[category]) {
              categoryRankings[category] = 0;
            }
            categoryRankings[category] += interactionScore;
          });
        }
  
      // Filter categories with positive score to determine user interests
      this.userInterests = Object.keys(categoryRankings).filter((category) => categoryRankings[category] > 0);
      return this.userInterests;
    }
  }
  
  export default UserInterestAnalyzer;
  