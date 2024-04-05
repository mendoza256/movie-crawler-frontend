export const fetchMongoDBUser = async (input: string) => {
  try {
    const response = await fetch("/api/user/watchlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      throw new Error(`Failed to add movie to watchlist: ${response.status}`);
    }

    const { success } = await response.json();

    if (success) {
      return { success: true, message: "Movie added to watchlist." };
    } else {
      return {
        success: false,
        message: "Failed to add movie to watchlist. Please try again.",
      };
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
};
