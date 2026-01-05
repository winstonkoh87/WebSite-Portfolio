import requests
from bs4 import BeautifulSoup

urls = [
    "http://localhost:4321/",
    "http://localhost:4321/portfolio",
    "http://localhost:4321/writing",
    "http://localhost:4321/services",
    "http://localhost:4321/athena",
    "http://localhost:4321/about",
    "http://localhost:4321/contact",
    "http://localhost:4321/framework",
    "http://localhost:4321/articles/ai-bionic-layer",
    "http://localhost:4321/articles/athena-5-pillars",
    "http://localhost:4321/articles/trilateral-feedback-loop",
    "http://localhost:4321/articles/athena-public-launch",
    "http://localhost:4321/articles/case-study-p6-math-tuition",
    "http://localhost:4321/articles/sme-ai-marketing-guide"
]

results = []

for url in urls:
    try:
        resp = requests.get(url, timeout=5)
        soup = BeautifulSoup(resp.text, 'html.parser')
        
        status = "OK" if resp.status_code == 200 else f"ERROR {resp.status_code}"
        has_athena = "YES" if soup.find(id="athena-widget") else "NO"
        has_mermaid = "YES" if soup.find(class_="mermaid") else "NO"
        
        results.append({
            "url": url,
            "status": status,
            "athena": has_athena,
            "mermaid": has_mermaid,
            "title": soup.title.string if soup.title else "N/A"
        })
    except Exception as e:
        results.append({"url": url, "status": f"EXCEPTION {str(e)}"})

print("| URL | Status | Athena | Mermaid | Title |")
print("|---|---|---|---|---|")
for r in results:
    print(f"| {r.get('url')} | {r.get('status')} | {r.get('athena')} | {r.get('mermaid')} | {r.get('title')} |")
