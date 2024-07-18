export const parseSubService = (subServiceInfo: [string, string]) => {
  const subServices = JSON.parse(subServiceInfo[0]);
  const detail = JSON.parse(subServiceInfo[1]);
  return {
    subServices: subServices.map((item: any) => ({
      _id: item._id,
      name: item.name,
    })),
    detail: {
      price: Number(detail.price),
      workingHours: Number(detail.workingHours),
    },
  };
};
