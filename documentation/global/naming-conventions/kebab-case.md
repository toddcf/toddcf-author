# Kebab-Case Naming Conventions

Run the following logic, in this order:

- Convert all letters to lowercase.
- Remove specific character codes completely (replace with empty strings). Listed alphabetically:
  - `&ldquo;`
  - `&lsquo;`
  - `&rdquo;`
  - `&rsquo;`
- Convert specific character codes to alternative values:
  - Replace `&amp;` with `-and-`. (Hyphens are in case there are no spaces around the ampersand. Multiple hyphens will be removed at the end.)
  - Replace `ö` with `o`. (Björk, etc.)
- Replace specific character codes with hyphens (listed alphabetically):
  - `&copy;`
  - `&gt;`
  - `&lt;`
  - `&mdash;`
  - `&nbsp;`
  - `&ndash;`
- Convert all remaining special characters (and spaces) to hyphens:
  - `replace(/[^a-z0-9]/g, '-')`
- Only one hyphen in a row:
  - `replace(/-+/g, '-')`
- No hyphens at beginning of string:
  ```
  if (conversion[0] === '-') {
    conversion = conversion.substr(1);
  }
  ```
- No hyphens at end of string:
  ```
  if (conversion.slice(conversion.length - 1) === '-') {
    conversion = conversion.substring(0, conversion.length - 1);
  }
  ```