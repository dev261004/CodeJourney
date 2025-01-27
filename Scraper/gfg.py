import requests
from bs4 import BeautifulSoup
import csv
import time
import random
import json
import re

def scrape_gfg_problems(base_url, num_pages=20, category=None, sort_by=None):
     all_problems = []
     for page_num in range(1, num_pages+1):
        params = {'page': page_num}
        if category:
            params['category'] = category
        if sort_by:
             params['sortBy'] = sort_by

        url = base_url + '?' + '&'.join([f"{key}={value}" for key, value in params.items()])

        print(f"Scraping page: {url}")
        try:
            response = requests.get(url)
            response.raise_for_status()  # Raise an exception for HTTP errors

            soup = BeautifulSoup(response.content, 'html.parser')

            json_data_script = soup.find('script', id='__NEXT_DATA__')

            if json_data_script:
                json_data = json.loads(json_data_script.string)
                # Extract relevant data from json_data
                problems = json_data.get("props",{}).get("pageProps",{}).get("initialState",{}).get("explorePageApi",{}).get("queries",{}).get('getTagsApi(null)',{}).get('data',[])


                for problem in problems:
                 if problem.get('classification') == "Data Structures" or problem.get('classification') =="Algorithm":
                    problem_link = "https://practice.geeksforgeeks.org/explore?category="+problem.get("tag")
                    problem_data = scrape_problem_details(problem_link)
                    if problem_data:
                       all_problems.append({
                        "id": problem_data.get("id"),
                        "title": problem_data.get("title"),
                         "difficulty":problem_data.get("difficulty"),
                          "companies": problem_data.get("companies"),
                        "link": problem_link
                        })


            time.sleep(random.randint(1, 3))  # Add a delay to respect the website

        except requests.exceptions.RequestException as e:
            print(f"Error scraping page {page_num}: {e}")
            break
     return all_problems

def scrape_problem_details(problem_link):
    try:
        response = requests.get(problem_link)
        response.raise_for_status()  # Raise an exception for HTTP errors

        soup = BeautifulSoup(response.content, 'html.parser')
        json_data_script = soup.find('script', id='__NEXT_DATA__')


        if json_data_script:
                json_data = json.loads(json_data_script.string)
                # Extract relevant data from json_data
                problem_data = {
                    "title": None,
                    "id": None,
                    "difficulty": None,
                    "companies": []
                }
                if json_data.get("props",{}).get("pageProps",{}).get('problems', []):
                   problems = json_data.get("props",{}).get("pageProps",{}).get('problems', [])
                   if len(problems)>0:
                      problem = problems[0]
                      problem_data["title"] = problem.get("problemTitle")
                      problem_data["id"] = problem.get("problemTitle")
                      problem_data["difficulty"] = problem.get("difficultyLevel")
                      problem_data["companies"] = problem.get("companyTags")
                return problem_data
        else:
              return None


    except requests.exceptions.RequestException as e:
        print(f"Error scraping problem details from {problem_link}: {e}")
        return None

if __name__ == "__main__":
    base_url = "https://practice.geeksforgeeks.org/explore"
    category = "Arrays"
    sort_by = "difficulty"

    scraped_data = scrape_gfg_problems(base_url,category=category, sort_by=sort_by)

    filename = f'gfg_problems_{category}.csv'

    with open(filename, 'w', encoding='utf-8', newline='') as csvfile:
        csv_writer = csv.writer(csvfile)
        csv_writer.writerow(["id", "title", "difficulty","companies", "link"]) # Write Header

        for problem in scraped_data:
           csv_writer.writerow([problem["id"], problem["title"], problem["difficulty"],",".join(problem["companies"]),problem["link"]])

    print(f"Successfully scraped {len(scraped_data)} GFG problems of category {category} sorted by {sort_by}. Data saved in {filename}")