export const requestsEnum = (id = null) => {
  return Object.freeze({
    createList: "createList",
    editList: `editList-${id}`,
    deleteList: `deleteList-${id}`,
    createCard: "createCard",
    editCard: `editCard-${id}`,
    deleteCard: `deleteCard-${id}`,
  });
};
