function b64toBlob(b64Data, contentType = "", sliceSize = 512) {

    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++)
            byteNumbers[i] = slice.charCodeAt(i);
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, {
        type: contentType
    });
    return blob;
}

const image = document.getElementById('image');
const button = document.getElementById('button');
const reader = new FileReader();

document.getElementById("file-input")
    .addEventListener("change", function () {
        reader.onload = () => {
            image.src = reader.result;

            let croppable = false;
            // eslint-disable-next-line no-undef
            const cropper = new Cropper(image, {
                aspectRatio: 1,
                viewMode: 1,
                ready: function () {
                    croppable = true;
                },
            });

            button.onclick = async () => {
                if (!croppable) return;

                const croppedCanvas = cropper.getCroppedCanvas();
                // const croppedImage = document.getElementById('cropped-image');
                const body = new FormData(document.createElement('form'))
                const block = croppedCanvas.toDataURL().split(";");
                const contentType = block[0].split(":")[1];
                const realData = block[1].split(",")[1];
                body.append('avatar', b64toBlob(realData, contentType));

                // eslint-disable-next-line no-undef
                const res = await fetch('/api/users/'+MEM_ID+'/avatar', {
                    method: 'POST',
                    body
                }).then(res => res.json());

                if (res.error) return alert(res.error);
                alert('Success!');
                location.reload();
            };
        }
        reader.readAsDataURL(event.target.files[0]);
    });