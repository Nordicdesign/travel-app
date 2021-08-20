export const clearListDom = (el) => {
  const listToDelete = document.querySelectorAll(el);
  listToDelete.forEach(node => node.remove());
};
