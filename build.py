#!/usr/bin/env python3
"""
build.py - Component Stamping Script for Portfolio V2.2

Injects shared nav/footer components into HTML pages.
Run from project root: python build.py

Components:
  _components/nav.html    -> Replaces {{NAV}} placeholder
  _components/footer.html -> Replaces {{FOOTER}} placeholder

Placeholders in components:
  {{ROOT}}           -> Relative path to root (e.g., "" or "../")
  {{ACTIVE_ABOUT}}   -> class="active" if page is about.html
  etc.
"""

import os
from pathlib import Path

# Configuration
PROJECT_ROOT = Path(__file__).parent
COMPONENTS_DIR = PROJECT_ROOT / "_components"
PAGES = [
    "index.html",
    "about.html",
    "portfolio.html",
    "athena.html",
    "framework.html",
    "writing.html",
    "contact.html",
    "404.html",
]

def load_component(name: str) -> str:
    """Load a component template from _components/"""
    path = COMPONENTS_DIR / name
    if not path.exists():
        print(f"⚠️  Component not found: {path}")
        return ""
    return path.read_text()

def get_active_class(page: str, target: str) -> str:
    """Return class='active' if page matches target"""
    page_name = Path(page).stem.lower()
    target_name = target.lower()
    if page_name == target_name:
        return ' class="active"'
    return ""

def process_page(page_path: str, nav_template: str, footer_template: str):
    """Process a single page: inject nav/footer components"""
    path = PROJECT_ROOT / page_path
    if not path.exists():
        print(f"⚠️  Page not found: {path}")
        return
    
    content = path.read_text()
    
    # Determine root path (for sub-pages, this would be "../")
    depth = page_path.count("/")
    root = "../" * depth if depth > 0 else ""
    
    # Process nav component
    nav = nav_template
    nav = nav.replace("{{ROOT}}", root)
    nav = nav.replace("{{ACTIVE_ABOUT}}", get_active_class(page_path, "about"))
    nav = nav.replace("{{ACTIVE_PORTFOLIO}}", get_active_class(page_path, "portfolio"))
    nav = nav.replace("{{ACTIVE_FRAMEWORK}}", get_active_class(page_path, "framework"))
    nav = nav.replace("{{ACTIVE_WRITING}}", get_active_class(page_path, "writing"))
    nav = nav.replace("{{ACTIVE_CONTACT}}", get_active_class(page_path, "contact"))
    
    # Process footer component
    footer = footer_template.replace("{{ROOT}}", root)
    
    # Replace placeholders in content
    if "{{NAV}}" in content:
        content = content.replace("{{NAV}}", nav)
        print(f"✅ {page_path}: Nav injected")
    
    if "{{FOOTER}}" in content:
        content = content.replace("{{FOOTER}}", footer)
        print(f"✅ {page_path}: Footer injected")
    
    # Write back
    path.write_text(content)

def main():
    print("🔧 Portfolio Build Script v1.0")
    print("=" * 40)
    
    # Load components
    nav_template = load_component("nav.html")
    footer_template = load_component("footer.html")
    
    if not nav_template or not footer_template:
        print("❌ Missing components. Aborting.")
        return
    
    # Process each page
    for page in PAGES:
        process_page(page, nav_template, footer_template)
    
    print("=" * 40)
    print("✨ Build complete!")
    print("\nTo use:")
    print("1. Replace <header>...</header> with {{NAV}} in your HTML")
    print("2. Replace <footer>...</footer> with {{FOOTER}} in your HTML")
    print("3. Run: python build.py")

if __name__ == "__main__":
    main()
