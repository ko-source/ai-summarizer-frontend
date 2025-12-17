export interface LoginResponse {
  access_token: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
}

export interface SignUpResponse {
  message: string;
  status: string;
  statusCode: number;
}

export interface SummaryResponse {
  id: number;
  summary: string;
  actionItems: string[];
  risks: string[];
  nextSteps: string[];
  createdAt: string;
}

export interface NavItem {
  name: string;
  href: string;
  current: boolean;
}

export interface SignUpRequest {
  username: string;
  email: string;
  password: string;
}

