export const isLicenseExpired = (licenseExpiry: string): boolean => {
    const expiryDate = new Date(licenseExpiry);
    const currentDate = new Date();
    return expiryDate < currentDate;
};
