export const isUserIdValid = (userId: string) => {
  const regex = /^([a-fA-f0-9]{8})(-([a-fA-f0-9]{4})){3}-([a-fA-f0-9]{12})$/;
  
}