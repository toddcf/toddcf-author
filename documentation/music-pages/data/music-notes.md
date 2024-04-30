# Music Notes

Each `notes` object in `window.digitalData.music` must follow these conventions:

- The `key` of this object is a string whose value is the name of the project title that should include this music.
    - Follow the [kebab-case naming conventions](../../global/naming-conventions/kebab-case.md).
    - If this artist or album should *not* be included for this project, simply omit that project title key.
    - If this artist or album applies to more than one project title, add a key for each title.
- The `value` is an array of objects.
    - Each object follows the [textTagBuilder](../../global/globalControl/textTagBuilder.md) format.
    - If there are no notes to be printed to the UI at this level, but the artist or album in general needs to be included for this project, set this to an empty array.
    


## Example

```
{
  notes: {
    'catch-up-to-myself': [
      {p: 'Paragraph 1.'},
      {p: 'Paragraph 2.'},
    ],
  },
}
```