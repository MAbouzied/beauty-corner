export interface CustomerLead {
  name: string;
  phone: string;
  department: string;
  service: string;
  locale: 'ar' | 'en';
  consent: boolean;
  website?: string;
}

export async function saveCustomerLead(lead: CustomerLead): Promise<void> {
  const response = await fetch('/api/customers', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'same-origin',
    keepalive: true,
    body: JSON.stringify(lead),
  });

  if (!response.ok) {
    throw new Error(`Customer API returned ${response.status}.`);
  }
}
