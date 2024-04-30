# Add Music Data

- `window.digitalData.music` (array of objects, each of which represents an artist):
    - `artist` (object):
        - `id` (string): Follow the [kebab-case naming conventions](../../global/naming-conventions/kebab-case.md).
        - `ui` (string): Follow the [UI naming conventions](../../global/naming-conventions/ui.md). *This entire artist object should be inserted into the `window.digitalData.music` array in alphabetical order according to this property's value.* For the purposes of alphabetization, ignore articles such as `A` or `The`.
    - `notes` (object):
        - Follow the architecture described in [Music Notes](music-notes.md).
    - `albums` (array of objects):
        - Each album should be inserted in the array in order of release date. (NOTE: Release date is not currently one of the properties because it is not being displayed in the UI.)
        - `notes` (object): Follow the architecture described in [Music Notes](music-notes.md).
        - `genre` (array of strings):
            - Each item in the array represents a genre that applies to this album. Follow the [UI naming conventions](../../global/naming-conventions/ui.md).
            - There can be as many genres in the array as necessary.
        - `saleLink` (string): A link to a website that sells this album.
        - `tracks` (array of objects; each object contains the following):
            - `trackNumber` (integer)
            - `artist` (object; only exists if this album is a DJ mix or compilation of various artists):
                - `id` (string): Follow the [kebab-case naming conventions](../../global/naming-conventions/kebab-case.md).
                - `ui` (string): Follow the [UI naming conventions](../../global/naming-conventions/ui.md).
            - `title` (string): Track title as it should appear in the UI. Follow the [UI naming conventions](../../global/naming-conventions/ui.md).
            - `notes` (object): Follow the architecture described in [Music Notes](music-notes.md).

If these conventions are followed exactly, the logic will programmatically pick up everything it needs and display it in the UI on the applicable music page(s).