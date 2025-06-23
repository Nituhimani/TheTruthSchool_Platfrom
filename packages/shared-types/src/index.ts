// API Response Types
export interface ApiSuccessResponse<T = unknown> {
	success: true;
	data: T;
	message?: string;
}

export interface ApiErrorResponse {
	success: false;
	error: string;
	message?: string;
}

// User Types
export interface User {
	id: string;
	email: string;
	name?: string;
	avatar?: string;
	role: UserRole;
	createdAt: string;
	updatedAt: string;
}

export enum UserRole {
	STUDENT = "student",
	PROFESSIONAL = "professional",
	ADMIN = "admin",
}

// Resume Types
export interface Resume {
	id: string;
	userId: string;
	filename: string;
	originalText: string;
	parsedData: ResumeData;
	analysis?: ResumeAnalysis;
	createdAt: string;
	updatedAt: string;
}

export interface ResumeData {
	personalInfo: {
		name?: string;
		email?: string;
		phone?: string;
		location?: string;
	};
	experience: WorkExperience[];
	education: Education[];
	skills: string[];
	sections: Record<string, string>;
}

export interface WorkExperience {
	company: string;
	position: string;
	startDate: string;
	endDate?: string;
	description: string;
	current: boolean;
}

export interface Education {
	institution: string;
	degree: string;
	field: string;
	startDate: string;
	endDate?: string;
	gpa?: string;
}

// AI Analysis Types
export interface ResumeAnalysis {
	overallScore: number;
	strengths: string[];
	weaknesses: string[];
	improvements: string[];
	atsCompatibility: number;
	missingKeywords: string[];
	generatedAt: string;
}

// Interview Types
export interface Interview {
	id: string;
	userId: string;
	type: InterviewType;
	status: InterviewStatus;
	roomId?: string;
	transcript?: string;
	feedback?: InterviewFeedback;
	scheduledAt?: string;
	startedAt?: string;
	completedAt?: string;
	createdAt: string;
}

export enum InterviewType {
	TECHNICAL = "technical",
	BEHAVIORAL = "behavioral",
	SYSTEM_DESIGN = "system_design",
	MOCK = "mock",
}

export enum InterviewStatus {
	SCHEDULED = "scheduled",
	IN_PROGRESS = "in_progress",
	COMPLETED = "completed",
	CANCELLED = "cancelled",
}

export interface InterviewFeedback {
	overallScore: number;
	communicationScore: number;
	technicalScore?: number;
	answers: AnswerFeedback[];
	strengths: string[];
	improvements: string[];
	nextSteps: string[];
}

export interface AnswerFeedback {
	question: string;
	answer: string;
	score: number;
	feedback: string;
}

// Code Challenge Types
export interface CodeChallenge {
	id: string;
	title: string;
	description: string;
	difficulty: ChallengeDifficulty;
	category: string;
	testCases: TestCase[];
	boilerplate: Record<string, string>; // language -> code
	timeLimit: number; // in minutes
	memoryLimit: number; // in MB
	createdAt: string;
}

export enum ChallengeDifficulty {
	EASY = "easy",
	MEDIUM = "medium",
	HARD = "hard",
}

export interface TestCase {
	input: string;
	expectedOutput: string;
	isHidden: boolean;
}

export interface CodeSubmission {
	id: string;
	userId: string;
	challengeId: string;
	code: string;
	language: string;
	status: SubmissionStatus;
	results?: ExecutionResult;
	submittedAt: string;
}

export enum SubmissionStatus {
	PENDING = "pending",
	RUNNING = "running",
	COMPLETED = "completed",
	ERROR = "error",
}

export interface ExecutionResult {
	passed: number;
	total: number;
	successRate: number;
	executionTime: number;
	memoryUsed: number;
	details: TestResult[];
}

export interface TestResult {
	input: string;
	expectedOutput: string;
	actualOutput: string;
	passed: boolean;
	executionTime: number;
	error?: string;
}
