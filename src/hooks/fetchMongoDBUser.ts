export const fetchMongoDBUser = async (userId: string) => {
  try {
    const response = await fetch(`/api/user?id=${userId}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Request failed with status " + response.status);
    }
    const data = await response.json();
    return { user: data.data, isLoading: false, isError: false };
  } catch (error) {
    return { user: null, isLoading: false, isError: true };
  }
};
