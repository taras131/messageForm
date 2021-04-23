`use strict`

document.addEventListener(`DOMContentLoaded`, function () {
    const form = document.getElementById(`form`);
    form.addEventListener(`submit`, formSend)

    async function formSend(e) {
        e.preventDefault();
        let error = formValidate(form)
        let formData = new FormData(form)
        formData.append(`image`, formImage.files[0])
        if (error === 0) {
            form.classList.add(`_sending`)
            let response = await fetch(`../mailer/smart.php`, {
                method: `POST`,
                body: formData
            })
            if (response.ok) {
                let result = response.json()
                alert(result.message)
                formPreview.innerHTML = ""
                form.reset()
                form.classList.remove(`_sending`)
            } else {
                alert("Ошибка")
                form.classList.remove(`_sending`)
            }
        } else {
            alert("заполните все обязательные поля")
        }
    }
    function formValidate(form) {
        let error = 0
        let formReq = document.querySelectorAll(`._req`)
        formReq.forEach(item => {
            formRemoveError(item)
            if (item.classList.contains(`_email`)) {
                if (testEmail(item)) {
                    formAddError(item)
                    error++
                }
            } else if (item.classList.contains(`_checkbox`) && item.checked === false) {
                formAddError(item)
                error++
            } else if (item.classList.contains(`_name`) && item.value == ``) {
                formAddError(item)
                error++
            }
        })
        return error
    }

    function formAddError(input) {
        input.parentElement.classList.add(`_error`)
        input.classList.add(`_error`)
        console.log(input)
    }

    function formRemoveError(input) {
        input.parentElement.classList.remove(`_error`)
        input.classList.remove(`_error`)
    }

    function testEmail(email) {
        return !/^\w+([\.-]?w+)*@\w+([\.-]?w+)*(\.\w{2,8})+$/.test(email.value)
    }

// loaded img
    const formImage = document.getElementById(`formImage`)
    const formPreview = document.getElementById(`formPreview`)
    formImage.addEventListener(`change`, () => {
        uploadFile(formImage.files[0])
    })

    function uploadFile(file) {
        if (![`image/jpeg`, `image/png`, `image/gif`].includes(file.type)) {
            alert("Допустимы только изображения")
            return
        }
        if (file.size > 2 * 1024 * 1024) {
            alert("Файл должен быть меньме 2 Mb")
            return
        }
        let reader = new FileReader()
        reader.onload = function (e) {
            formPreview.innerHTML = `<img src="${e.target.result}" alt="Фото">`
        }
        reader.onerror = function (e) {
            alert("Ошибка")
        }
        reader.readAsDataURL(file)
    }
})