export interface CustomerContactVM {
    Id: string;
    Name: string;
    BirthDate: Date;
    Phone: string;
    Email: string;
    Address: string;
    Position: string;
    Note?: string;
    Functional?: string;
    Nation?: number;
    Gender?: number;
}
export interface CustomerContactCM {
    Name: string;
    BirthDate: Date;
    Phone: string;
    Email: string;
    Address: string;
    Position: string;
    Note?: string;
    Functional?: string;
    Nation?: number;
    Gender?: number;
}

export interface CustomerContactUM {
    Id: string;
    Name: string;
    BirthDate: Date;
    Phone: string;
    Email: string;
    Address: string;
    Position: string;
    Note?: string;
    Functional?: string;
    Nation?: number;
    Gender?: number;
}
export const CUSTOMER_CONTACT_POSITIONS = null;
export const CUSTOMER_CONTACT_FUNCTIONS = null;
