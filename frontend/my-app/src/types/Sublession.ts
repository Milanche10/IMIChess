// Define a type for a sublesson
type Sublession = {
    id: number;
    lessonId: number; // Link sublesson to a lesson using lessonId
    title: string;
    description: string;
    duration: string; // You can use a string for duration, or use a different type as needed
    url: string; // Url to video
};

export default Sublession;