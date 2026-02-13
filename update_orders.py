#!/usr/bin/env python3
"""
Script to clean up softwareLessons.js by removing old Module 3 lessons
and replacing them with unified structure
"""

import re

def clean_software_lessons():
    file_path = r"c:\Users\couga\Documents\statassignments\src\data\softwareLessons.js"

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Step 1: Add import statement if not present
    if "import { module3UnifiedLessons }" not in content:
        # Find the position after the comment block
        pattern = r"(\*/\n\n)(export const softwareLessons)"
        replacement = r"\1import { module3UnifiedLessons } from './softwareLessons_module3_unified.js'\n\n\2"
        content = re.sub(pattern, replacement, content)
        print("Added import statement")

    # Step 2: Find and replace Module 3 lessons
    # Find the start: "export const softwareLessons = ["
    # Find first Module 3 comment
    # Find last Module 3 lesson (stata-import-data)
    # Find the next lesson which should be Module 4

    # Pattern to match all Module 3 lessons (from first comment to last },)
    # We'll match from "// ============ STATISTICS MODULE 3:" to the lesson before Module 4

    # Find where Module 3 starts
    module3_start = content.find("// ============ STATISTICS MODULE 3:")
    if module3_start == -1:
        print("Could not find Module 3 start marker")
        return False

    # Find where Module 4 starts (looking for the module-4 declaration)
    # We need to find "module: 'stats-module-4'" but make sure it's in a real lesson
    pattern_module4 = r"\n  \{\s*\n\s*id: 'jamovi-descriptive-stats',\s*\n\s*module: 'stats-module-4',"
    match = re.search(pattern_module4, content)
    if not match:
        print("Could not find Module 4 start")
        return False

    module4_start = match.start()

    print(f"Module 3 starts at position {module3_start}")
    print(f"Module 4 starts at position {module4_start}")
    print(f"Will replace {module4_start - module3_start} characters")

    # Replace Module 3 lessons with unified structure
    replacement_text = """// ============ STATISTICS MODULE 3: Software Basics (Unified Lessons) ============
  // Each software has one unified lesson with multiple sections in iDo phase
  ...module3UnifiedLessons,

"""

    new_content = content[:module3_start] + replacement_text + content[module4_start:]

    # Write back
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)

    print(f"Successfully replaced Module 3 lessons with unified structure")
    print(f"File reduced from {len(content)} to {len(new_content)} characters")
    return True

if __name__ == '__main__':
    clean_software_lessons()
