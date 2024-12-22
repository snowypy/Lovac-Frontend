import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const setStaffIdCookie = (staffId: string) => {
    document.cookie = `staffId=${staffId}; path=/;`;
};

export const getStaffIdFromCookie = () => {
    const match = document.cookie.match(/(^|;)\s*staffId=([^;]+)/);
    return match ? match[2] : null;
};


// [@] might use later
export const executeStaffAction = (action: string) => {
    const staffId = getStaffIdFromCookie();
    if (staffId) {
        console.log(`Executing action: ${action} for staffId: ${staffId}`);
    } else {
        console.error('No staffId found in cookie.');
    }
};
