# Add Music Data

- All music data is contained in `window.digitalData.music`, which is an array of objects. Each object in the array represents an artist.
    - `artist` (object):
        - `id` (string): Follow the [kebab-case naming conventions](../../global/naming-conventions/kebab-case.md).
        - `ui` (string): Follow the [UI naming conventions](../../global/naming-conventions/ui.md). *This entire artist object should be inserted into the `window.digitalData.music` array in alphabetical order according to this property's value.* For the purposes of alphabetization, ignore articles such as `A` or `The`.
    - `notes` (object):
        - Follow the architecture described in [Music Notes](music-notes.md).