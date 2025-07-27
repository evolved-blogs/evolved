const getQuestions = async (level: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/questions/${level}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch questions");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw error;
  }
};
export const questionService = {
  getQuestions,
};
