import os
import re
from urllib.parse import unquote

def audit_links(root_dir):
    print(f"🔍 Auditing internal links in: {root_dir}\n")
    broken_links = []
    checked_count = 0
    
    for dirpath, _, filenames in os.walk(root_dir):
        for filename in filenames:
            if not filename.endswith('.html'):
                continue
                
            file_path = os.path.join(dirpath, filename)
            rel_path_from_root = os.path.relpath(file_path, root_dir)
            
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
                
            # Simple regex to find hrefs. 
            # Note: This is not a perfect HTML parser but good enough for static sites.
            # Matches href="value" or href='value'
            matches = re.finditer(r'href=["\'](.*?)["\']', content)
            
            for match in matches:
                link = match.group(1)
                
                # Skip external links, anchors, mailto, etc.
                if link.startswith(('http', 'https', '#', 'mailto:', 'tel:', 'javascript:')):
                    continue
                
                checked_count += 1
                
                # Determine absolute path of the target
                # If link starts with /, it is relative to root_dir
                # If link starts with ./ or ../ or alphanumeric, it is relative to current file
                
                target_path = ""
                if link.startswith('/'):
                    target_path = os.path.join(root_dir, link.lstrip('/'))
                else:
                    target_path = os.path.join(dirpath, link)
                
                # Normalize path (resolve ../)
                target_path = os.path.normpath(target_path)
                
                # Remove query params or anchors from target filename for checking existence
                target_file = target_path.split('#')[0].split('?')[0]
                
                if not os.path.exists(target_file):
                    broken_links.append({
                        'source': rel_path_from_root,
                        'link': link,
                        'resolved_target': target_file
                    })

    print(f"✅ Checked {checked_count} internal links.")
    
    if broken_links:
        print(f"❌ Found {len(broken_links)} BROKEN links:\n")
        for error in broken_links:
            print(f"  📄 Source: {error['source']}")
            print(f"  🔗 Link:   {error['link']}")
            print(f"  ❌ Target: {error['resolved_target']}")
            print("-" * 40)
    else:
        print("🎉 No broken internal links found.")

if __name__ == "__main__":
    # Assumes script is run from project root or we point to it
    # We will pass the directory explicitly when running
    import sys
    target_dir = sys.argv[1] if len(sys.argv) > 1 else "."
    audit_links(target_dir)
