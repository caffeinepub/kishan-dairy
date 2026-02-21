export function validateName(name: string): string | null {
  const trimmed = name.trim();
  if (!trimmed) {
    return 'Name is required';
  }
  if (trimmed.length < 2) {
    return 'Name must be at least 2 characters';
  }
  if (trimmed.length > 100) {
    return 'Name must be less than 100 characters';
  }
  return null;
}

export function validatePhoneNumber(phone: string): string | null {
  const trimmed = phone.trim();
  const phoneRegex = /^[6-9]\d{9}$/;
  
  if (!trimmed) {
    return 'Phone number is required';
  }
  if (!phoneRegex.test(trimmed)) {
    return 'Please enter a valid 10-digit Indian phone number';
  }
  return null;
}

export function validateAddress(address: string): string | null {
  const trimmed = address.trim();
  const lowerAddress = trimmed.toLowerCase();
  
  if (!trimmed) {
    return 'Address is required';
  }
  if (trimmed.length < 10) {
    return 'Please enter a complete address';
  }
  if (!lowerAddress.includes('sitamarhi') && !lowerAddress.includes('bihar')) {
    return 'We only deliver to Sitamarhi, Bihar. Please ensure your address includes Sitamarhi or Bihar.';
  }
  return null;
}

