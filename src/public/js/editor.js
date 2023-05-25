function editor( uniqueId, textarea = document.getElementById("textarea")) {
    
    return new SimpleMDE({
        autosave: {
            enabled: true,
            uniqueId,
            delay: 1000,
        },//    width: 100%;

        element: textarea,
        spellChecker: false

    });

}
