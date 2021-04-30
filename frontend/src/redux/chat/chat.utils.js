export const searchChatByQuery = (chats, query) => {
   if (!query) return [];
   return chats.filter(
      chat =>
         chat.username.toLowerCase().startsWith(query.toLowerCase()) ||
         chat.username.toLowerCase().includes(query.toLowerCase())
   );
};
