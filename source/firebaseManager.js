import firebase from "./firebase";

function FirebaseManager() {}

FirebaseManager.prototype.getProjectList = function(id, cb) {
    firebase
        .firestore()
        .collection("users")
        .doc(id)
        .get()
        .then(querySnapshot => {
            cb(querySnapshot.data().projects);
        });
};

FirebaseManager.prototype.checkProjectNameOverLap = function(projectName, cb) {
    let check = false;

    firebase
        .firestore()
        .collection("projects")
        .get()
        .then(querySnapshot => {
            querySnapshot.docs.forEach(project => {
                if (check === false && projectName === project.id) {
                    check = true;
                    cb(true);
                }
            });
        });

    if (check === false) {
        cb(false);
    }
};

FirebaseManager.prototype.pushNewProject = function(projectName, id) {
    //
    firebase
        .firestore()
        .collection("users")
        .doc(id)
        .update({
            projects: firebase.firestore.FieldValue.arrayUnion(projectName)
        })
        .then(querySnapshot => {
            //
            firebase
                .firestore()
                .collection("projects")
                .doc(projectName)
                .set({ owner: id, manager: [id], members: [id] });
        });
};

FirebaseManager.prototype.getMessages = function(id, cb) {
    let arr = [];

    //
    firebase
        .firestore()
        .collection("users")
        .doc(id)
        .collection("messages")
        .get()
        .then(querySnapshot => {
            querySnapshot.docs.forEach(m => {
                arr.push(m.data());
            });
            cb(arr);
        });
};

FirebaseManager.prototype.isUserExist = function(id, cb) {
    //
    firebase
        .firestore()
        .collection("users")
        .doc(id)
        .get()
        .then(querySnapshot => {
            if (querySnapshot.exists) {
            } else {
            }
            if (cb) cb(querySnapshot.exists);
        });
};

FirebaseManager.prototype.getProjectData = function(companyName, projectName, cb) {
    //
    firebase
        .firestore()
        .collection("company")
        .doc(companyName)
        .collection("projects")
        .doc(projectName)
        .get()
        .then(querySnapshot => {
            let data = querySnapshot.data();
            data["projectName"] = projectName;
            cb(data);
        });
};

FirebaseManager.prototype.getTimeLine = function(companyName, projectName, cb) {
    let arr = [];
    //
    firebase
        .firestore()
        .collection("company")
        .doc(companyName)
        .collection("projects")
        .doc(projectName)
        .collection("timelines")
        .get()
        .then(querySnapshot => {
            querySnapshot.docs.forEach(m => {
                arr.push(m.data());
            });

            cb(arr);
        });
};

FirebaseManager.prototype.pushTimeLine = function(
    companyName,
    projectName,
    id,
    title,
    content,
    startTime,
    endTime,
    taskId,
    progress,
    cb
) {
    //
    firebase
        .firestore()
        .collection("company")
        .doc(companyName)
        .collection("projects")
        .doc(projectName)
        .collection("timelines")
        .add({
            id: id,
            title: title,
            content: content,
            startTime: firebase.firestore.Timestamp.fromDate(new Date(startTime)),
            endTime: firebase.firestore.Timestamp.fromDate(new Date(endTime))
        })
        .then(querySnapshot => {
            firebase
                .firestore()
                .collection("company")
                .doc(companyName)
                .collection("projects")
                .doc(projectName)
                .collection("tasks")
                .doc(taskId)
                .update({ progress: Number(progress) });
            if (cb) cb();
        });
};

//
FirebaseManager.prototype.createNewUser = function(id, cb) {
    let batch = firebase.firestore().batch();
    let projectsRef = firebase
        .firestore()
        .collection("projects")
        .doc("getgoal(SAMPLE)");
    batch.update(projectsRef, { members: firebase.firestore.FieldValue.arrayUnion(id) });
    let usersRef = firebase
        .firestore()
        .collection("users")
        .doc(id);
    batch.set(usersRef, { nickname: "null", projects: ["getgoal(SAMPLE)"] });

    batch.commit().then(querySnapshot => {
        new FirebaseManager().pushMessage(id, "감사합니다.", "4things", "환영합니다.");
    });
};

FirebaseManager.prototype.pushMessage = function(
    id,
    content = "content",
    senderID = "senderID",
    title = "title",
    type = "message",
    cb = null
) {
    if (type !== "message" && type !== "invite") {
        console.error("message type error");
        type = "message";
    }
    //
    firebase
        .firestore()
        .collection("users")
        .doc(id)
        .collection("messages")
        .add({
            content: content,
            senderID: senderID,
            title: title,
            type: type,
            isRead: false
        })
        .then(querySnapshot => {
            firebase
                .firestore()
                .collection("users")
                .doc(id)
                .collection("messages")
                .doc(querySnapshot.id)
                .update({ id: querySnapshot.id });
        });
};

FirebaseManager.prototype.deleteMessage = function(id, messageID, cb) {
    //
    firebase
        .firestore()
        .collection("users")
        .doc(id)
        .collection("messages")
        .doc(messageID)
        .delete()
        .then(querySnapshot => {
            if (cb) cb();
        });
};

FirebaseManager.prototype.pushProjectMember = function(id, projectName, cb) {
    firebase
        .firestore()
        .collection("projects")
        .where("members", "array-contains", projectName)
        .get()
        .then(function(querySnapshot) {
            console.log(querySnapshot);
        });

    // let batch = firebase.firestore().batch();
    // let projectsRef = firebase
    //     .firestore()
    //     .collection("projects")
    //     .doc(projectName);
    // batch.update(projectsRef, { members: firebase.firestore.FieldValue.arrayUnion(id) });

    // let usersRef = firebase
    //     .firestore()
    //     .collection("users")
    //     .doc(id);
    // batch.update(usersRef, { projects: firebase.firestore.FieldValue.arrayUnion(projectName) });

    // batch.commit().then(querySnapshot => {
    //     // new FirebaseManager().pushMessage(id, "감사합니다.", "4things", "환영합니다.");
    // });
};

FirebaseManager.prototype.getTasks = function(companyName, projectName, cb) {
    //
    firebase
        .firestore()
        .collection("company")
        .doc("4things")
        .collection("projects")
        .doc(projectName)
        .collection("tasks")
        .get()
        .then(querySnapshot => {
            let arr = [];
            querySnapshot.docs.forEach(m => {
                arr.push(m.data());
            });
            if (cb) cb(arr);
        });
};

FirebaseManager.prototype.addTask = function(companyName, projectName, title, content, start, end, cb) {
    //
    firebase
        .firestore()
        .collection("company")
        .doc(companyName)
        .collection("projects")
        .doc(projectName)
        .collection("tasks")
        .add({
            content: content,
            title: title,
            start: firebase.firestore.Timestamp.fromDate(new Date(start)),
            end: firebase.firestore.Timestamp.fromDate(new Date(end)),
            assigned: "null",
            id: "test"
        })
        .then(querySnapshot => {
            firebase
                .firestore()
                .collection("company")
                .doc(companyName)
                .collection("projects")
                .doc(projectName)
                .collection("tasks")
                .doc(querySnapshot.id)
                .update({ id: querySnapshot.id });
        });
};

FirebaseManager.prototype.assignTasks = function(companyName, projectName, taskId, userIdToBeSigned, cb) {
    //
    firebase
        .firestore()
        .collection("company")
        .doc(companyName)
        .collection("projects")
        .doc(projectName)
        .collection("tasks")
        .doc(taskId)
        .update({ assigned: userIdToBeSigned, type: "InProgressLane" })
        .then(querySnapshot => {
            cb();
        });
};

export default new FirebaseManager();
