import os
from leetscrape import GetQuestionsList, GetQuestion
from pymongo import MongoClient
from dotenv import load_dotenv, dotenv_values 

load_dotenv() 

# Connect to MongoDB
client = MongoClient(os.getenv(MONGODB_URL))  # Update with your MongoDB connection string
db = client["codejourney"]  # Database name
questions_collection = db["questions"]  # Collection for questions
companies_collection = db["companies"]  # Collection for companies
topics_collection = db["topics"]  # Collection for topics

# Scrape the list of questions
ls = GetQuestionsList()
ls.scrape()

# Insert questions data
questions_data = ls.questions.to_dict(orient="records")
questions_collection.insert_many(questions_data)

# Scrape details for each question (optional but useful)
for question in questions_data:
    title_slug = question["titleSlug"]
    details = GetQuestion(titleSlug=title_slug).scrape()

    # Prepare detailed question data
    question_details = {
        "QID": details.QID,
        "title": details.title,
        "titleSlug": details.titleSlug,
        "difficulty": details.difficulty,
        "hints": details.Hints,
        "companies": details.Companies,
        "topics": details.topics,
        "similarQuestions": details.SimilarQuestions,
        "codeStubs": details.Code,
        "body": details.Body,
        "isPaidOnly": details.isPaidOnly,
    }

    # Update or insert question details in MongoDB
    questions_collection.update_one(
        {"titleSlug": title_slug},
        {"$set": question_details},
        upsert=True,
    )

# Save company data
companies_data = ls.companies.to_dict(orient="records")
companies_collection.insert_many(companies_data)

# Save topic data
topics_data = ls.topicTags.to_dict(orient="records")
topics_collection.insert_many(topics_data)

print("Data saved to MongoDB successfully!")
