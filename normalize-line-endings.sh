#!/bin/bash

echo "🔧 Normalizing line endings to LF (Unix/Linux) format..."

# Function to convert line endings
normalize_file() {
    local file="$1"
    if [ -f "$file" ]; then
        # Check if file has CRLF
        if grep -q $'\r' "$file" 2>/dev/null; then
            echo "  🔄 Converting: $file"
            sed -i 's/\r$//' "$file"
        else
            echo "  ✅ Already LF: $file"
        fi
    fi
}

# Normalize text files (excluding SVG which should be binary)
echo "📄 Normalizing text files..."
find . -type f \( \
    -name "*.php" -o \
    -name "*.js" -o \
    -name "*.jsx" -o \
    -name "*.ts" -o \
    -name "*.tsx" -o \
    -name "*.css" -o \
    -name "*.scss" -o \
    -name "*.json" -o \
    -name "*.yml" -o \
    -name "*.yaml" -o \
    -name "*.xml" -o \
    -name "*.md" -o \
    -name "*.txt" -o \
    -name "*.sh" -o \
    -name "*.bash" -o \
    -name "*.sql" -o \
    -name "*.conf" -o \
    -name "*.config" -o \
    -name "*.ini" -o \
    -name ".env*" -o \
    -name "Dockerfile*" -o \
    -name "*.blade.php" \
\) -not -path "./node_modules/*" -not -path "./.git/*" | while read -r file; do
    normalize_file "$file"
done

# Normalize specific files
echo "📋 Normalizing configuration files..."
for file in .editorconfig .gitignore .gitattributes artisan; do
    normalize_file "$file"
done

echo "✅ Line ending normalization complete!"
echo ""
echo "📝 Future prevention measures are now in place:"
echo "  - .editorconfig: Enforces LF line endings in editors"
echo "  - .gitattributes: Ensures git handles line endings correctly"
echo "  - Git config: Prevents automatic CRLF conversion"
echo "  - SVG files: Treated as binary to prevent corruption"
echo ""
echo "🎯 Recommended VS Code settings (add to settings.json):"
echo '  "files.eol": "\\n",'
echo '  "files.insertFinalNewline": true,'
echo '  "files.trimTrailingWhitespace": true'
