# Line Endings Configuration

This project is configured to use Unix/Linux line endings (LF) consistently across all files to prevent issues when working in mixed Windows/WSL2/Linux environments.

## Configuration Files

### .editorconfig
Enforces LF line endings in code editors that support EditorConfig:
- All files default to `end_of_line = lf`
- Specific rules for different file types
- UTF-8 charset enforcement

### .gitattributes
Ensures Git handles line endings correctly:
- `* text=auto eol=lf` - Normalizes all text files to LF
- Explicit rules for all project file types
- Binary file declarations to prevent conversion

### Git Configuration
Local git settings prevent automatic CRLF conversion:
- `core.autocrlf = false` - No automatic conversion
- `core.eol = lf` - Use LF for new files
- `core.safecrlf = true` - Warn about mixed line endings

## Normalization Script

Run `./normalize-line-endings.sh` to:
- Convert all existing files to LF line endings
- Check and fix any files with mixed line endings
- Provide status report of conversions

## VS Code Settings

Add to your VS Code `settings.json`:
```json
{
  "files.eol": "\n",
  "files.insertFinalNewline": true,
  "files.trimTrailingWhitespace": true
}
```

## Troubleshooting

### Script execution error: "required file not found"
This indicates Windows line endings in the script file:
```bash
sed -i 's/\r$//' filename.sh
chmod +x filename.sh
```

### Laravel URI error: "Invalid URI: A URI cannot contain CR/LF/TAB characters"
This indicates Windows line endings in `.env` file:
```bash
sed -i 's/\r$//' .env
```

### General line ending check
```bash
cat -A filename  # Shows line endings (^M$ = Windows, $ = Unix)
```

## Prevention

With the current configuration:
1. **Editors** will automatically use LF line endings
2. **Git** will normalize line endings on commit
3. **New files** will use LF line endings by default
4. **Existing files** have been normalized to LF

This prevents the Windows/WSL2 line ending issues that can cause script execution failures and Laravel configuration problems.
