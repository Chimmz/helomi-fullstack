export const addAndRemoveAlert = (add, remove, timeout = 3000) => {
   setTimeout(remove, timeout);
   add();
};
