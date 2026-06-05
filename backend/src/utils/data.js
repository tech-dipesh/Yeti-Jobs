export const AVAIBLE_JOB_TYPE=["Onsite", "Remote", "Hybrid"];

export const IMAGE_ALLOWED_TYPE = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];


export const AVAIBLE_APPLICATION_TYPE=["applied", "shortlisted", "rejected", "hired",];

export const AVAIBLE_EDUCATION_TYPE = ["Basic", "Matrix","High School", "Undergraduation","Postgraduation",];


export const WEBSITE_PATTERN=/^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})(\/[^\s]*)?$/



export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const PASSWORD_REGEX =/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,20}$/;
export const PHONE_NUMBER_REGEX=/^\+(?:[0-9] ?){6,14}[0-9]$/



export const ALL_TABLE_LIST=['users', 'jobs', 'companies', 'applications', 'saved_jobs', 'email_verified', 'user_companies_follows', 'ats_scores', 'user_education']


export const ALLOW_SEARCH_QUERY=["uid", "title", "description", "salary", "job_type", "is_job_open", "created_by", "created_at", "skills", "total_job_views"];


export const SearchSortBy=['created_at', 'salary', 'total_job_views']
