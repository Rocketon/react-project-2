export const getPageCount = (totalCount, limit) => {
  return Math.ceil(totalCount / limit);
};

export const getPagesArray = (totalPages) => { // с помощью useMemo сделать чтобы не пересчитывался каждый рендер
  let result = [];
  for (let i = 0; i < totalPages; i++) {
    result.push(i+1);
  }
  return result;
};
