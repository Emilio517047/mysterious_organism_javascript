// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}

const specificStrand = ['C', 'T', 'T', 'A', 'C', 'C', 'C', 'G', 'A', 'T', 'C', 'G', 'G', 'C', 'C'];

// Create organism factory function
const pAequorFactory = (specimenNum, dna) => {
  return ({
    specimenNum: specimenNum,
    dna: dna,

    // Mutate DNA
    mutate() {
      let i = this.dna[Math.floor(Math.random() * 15)];
      let baseSelector = this.dna[i];
      let newBase = returnRandBase();
      while (baseSelector === newBase) {
        newBase = returnRandBase();
      }
      this.dna.splice(baseSelector, 1, newBase)
      return this.dna
    },

  // Comparing DNA
    compareDNA(otherPAequor) {
      let count = 0;
      for (j = 0; j < this.dna.length; j++) {
        if (this.dna[j] === otherPAequor.dna[j]) {
          count += 1;
      }
    }
      let percentCommon = (count * 100) / this.dna.length;
      console.log(`Specimen ${this.specimenNum} and ${otherPAequor.specimenNum} have ${percentCommon}% DNA in common`);
  },

  // Likely survive
  willLikelySurvive() {
    const CorGBase = this.dna.filter(base => base === 'C' || base === 'G')
    if (CorGBase / this.dna.length > 0.6) {
      return true;
    } else {
      return false;
    }
  },  
  })
}

// 30 instances of pAequor
let instances = [];
let k = 1;
while (k < 30) {
  let instant = pAequorFactory(k, mockUpStrand());
  if (instant.willLikelySurvive() === true) {
    instances.push(instant);
  }
  k++;
}

console.log(instances)
