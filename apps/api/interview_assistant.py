import os
from dotenv import load_dotenv
import google.generativeai as genai

# Load environment variables from .env file
load_dotenv()

# Get API key from environment or prompt
API_KEY = os.getenv('GEMINI_API_KEY')
if not API_KEY:
    API_KEY = input('Enter your Gemini API key: ').strip()

genai.configure(api_key=API_KEY)

MODEL_NAME = 'gemini-1.5-flash'
model = genai.GenerativeModel(MODEL_NAME)

# Helper to call Gemini for question generation

def generate_questions(intro, role, experience, tech_stacks, num_questions=5):
    prompt = f"""
You are an expert technical interviewer. Based on the following candidate information, generate {num_questions} interview questions for the role. Ask a mix of technical and behavioral questions. Do not include answers.

Introduction: {intro}
Role: {role}
Experience Level: {experience}
Tech Stacks: {tech_stacks}

Format: Numbered list, one question per line.
"""
    response = model.generate_content(prompt)
    questions = []
    for line in response.text.strip().split('\n'):
        if line.strip() and any(c.isalpha() for c in line):
            q = line.split('.', 1)[-1].strip() if '.' in line else line.strip()
            questions.append(q)
    return questions

# Helper to review answers

def review_candidate(intro, role, experience, tech_stacks, qa_pairs):
    qa_text = '\n'.join([f"Q: {q}\nA: {a}" for q, a in qa_pairs])
    prompt = f"""
You are an expert technical interviewer. Here is a candidate's information and their answers to interview questions. Review their performance for the role. State if they are a good fit, which areas to focus on, and give kind suggestions for improvement.

Introduction: {intro}
Role: {role}
Experience Level: {experience}
Tech Stacks: {tech_stacks}

Interview Q&A:
{qa_text}

Format:
- Overall assessment
- Areas to focus on
- Suggestions for improvement
"""
    response = model.generate_content(prompt)
    return response.text.strip()

def main():
    print("Welcome to the Interview Assistant!\n")
    intro = input("Please introduce yourself: ")
    role = input("What role are you interviewing for? ")
    experience = input("What is your experience level? (Entry, Junior, Mid, Senior, Staff, Principal, Director): ")
    tech_stacks = input("What tech stacks do you know? ")

    # Ask how many questions (between 3 and 15)
    while True:
        try:
            num_questions = int(input("How many interview questions would you like? (3-15): "))
            if 3 <= num_questions <= 15:
                break
            else:
                print("Please enter a number between 3 and 15.")
        except ValueError:
            print("Please enter a valid number.")

    print("\nGenerating interview questions...\n")
    questions = generate_questions(intro, role, experience, tech_stacks, num_questions)
    qa_pairs = []
    for idx, q in enumerate(questions, 1):
        print(f"Question {idx}: {q}")
        a = input("Your answer: ")
        qa_pairs.append((q, a))
        print()

    print("\nReviewing your answers...\n")
    review = review_candidate(intro, role, experience, tech_stacks, qa_pairs)
    print("\n--- Interview Review ---\n")
    print(review)

if __name__ == "__main__":
    main() 