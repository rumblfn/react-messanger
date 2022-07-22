export const validateFile = (file, setterError, setterSussecc) => {
    setterError("");
    if (file.type.startsWith("image")) {
        if (file.size < 10000000) {
            setterSussecc(file);
        } else {
            setterError("The file weighs more than 10mb, try another one");
        }
    } else {
        setterError("We only accept images");
    }
};

export const UpdateImageFromFile = (file, setter) => {
    if (FileReader && file) {
        let fr = new FileReader();
        fr.onload = function () {
            setter(fr.result);
        };
        fr.readAsDataURL(file);
    }
};