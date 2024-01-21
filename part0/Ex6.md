```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: Post https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: Status 201 Resource Created

    Note right of browser: The browser rerenders the notes list and sends the new note to the server
    deactivate server
```
