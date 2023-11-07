type Lession = {
    _id: string; // Replace with the actual type of your lesson ID
    name: string;
    description: string;
    complexityLevel: string;
    numberOfSublessons: number;
    shortDescription: string;
    sublessons: Sublesson[];
  };
  
  type Sublesson = {
    id: string; // Replace with the actual type of your sublesson ID
    title: string;
    description: string;
    duration: string;
    url: string;
  };
  
  export default Lession;
  