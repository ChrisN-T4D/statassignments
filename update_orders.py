import re

# Read the file
with open('src/data/statisticsPractices.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Flag to track if we're past the Chapter 10 section
past_chapter_10 = False
in_module_8 = False

# Process each line
output_lines = []
i = 0
while i < len(lines):
    line = lines[i]
    
    # Check if we're in module-8
    if "module: 'module-8'," in line:
        in_module_8 = True
    
    # Check if we've reached topics after categorical-data-analysis
    if in_module_8 and "topic: 'categorical-data-analysis'," in line:
        # Check the title to see if it's one of our NEW exercises
        # Look ahead a few lines for the title
        for j in range(i, min(i+5, len(lines))):
            if 'title:' in lines[j] and any(x in lines[j] for x in [
                'Calculate Degrees of Freedom Manually',
                'Calculate Chi-Square Statistic by Hand',
                'Interpret Standardized Residuals',
                'Decision Tree: Choose the Right Categorical Test',
                'Understand Chi-Square Distribution Properties',
                'Real-World Application: Analyze Survey Data'
            ]):
                # This is one of our new exercises, don't mark as past
                break
        else:
            # Not a new exercise, we're still in old categorical-data section
            pass
    
    # Mark when we transition from categorical to other topics
    if in_module_8 and any(topic in line for topic in [
        "topic: 't-tests',", "topic: 'correlation',", "topic: 'regression',",
        "topic: 'anova',", "topic: 'effect-size-ttests',", 
        "topic: 't-tests-detailed',", "topic: 't-tests-assumptions',",
        "topic: 'nonparametric-tests',", "topic: 't-tests-practice',",
        "topic: 't-tests-interpretation',", "topic: 't-tests-comprehensive',"
    ]):
        past_chapter_10 = True
    
    # Update order numbers if we're past Chapter 10
    if past_chapter_10 and 'order:' in line:
        # Extract the current order number
        match = re.search(r'order: (\d+),', line)
        if match:
            old_order = int(match.group(1))
            if old_order >= 12:  # Only update orders that were originally 12 or higher
                new_order = old_order + 6
                line = line.replace(f'order: {old_order},', f'order: {new_order},')
    
    output_lines.append(line)
    i += 1

# Write the updated content
with open('src/data/statisticsPractices.js', 'w', encoding='utf-8') as f:
    f.writelines(output_lines)

print("Successfully updated order numbers!")
