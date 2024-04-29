# Text Tag Builder

*NOTE: For now, this method is specifically designed to handle the Music cards. In the future, it will be expanded to take in more parameters so that it can be used for any site section where text tags need to be built programmatically.*

1. Structure the data in the data layer as follows:
  - All of the text data is contained inside an array.
  - Each item in the array is an object.
  - Each object is a key/value pair where the key is the tag type (such as `p`, `q`, `ol`, `ul`, `li`, etc.).
  - If the key is list-related (`ol`, `ul`, `li`), its value must also be an array. That array will contain the child tag type until it finally reaches an actual 'text' tag type (`p`, `q`, etc.).
  - If the key is a 'text' tag type (`p`, `q`, etc.), then the value is a string (or template literal, if necessary) containing the text that will be displayed in the UI.
2. The first argument to pass into the `textTagBuilder` method is the array from the data layer that you want printed to the UI.
3. The second argument to pass into the `textTagBuilder` method is the `noteType`. (For now, `noteType` is specific to Music pages. But in the future, this should be built out to take in a list of classes (as programmatically as possible) so that any site section can make use of this logic.)