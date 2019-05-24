// tai khoan
function deleteAcc(id){
    let confirmText = "Bạn có muốn xóa không ?";
    console.log(id);
    if (confirm(confirmText)) {
        axios.delete("/admin/tai-khoan/"+id)
        .then((res) => {
            location.reload(true);
        })
        .catch((err) => {
            console.log(err);
        })
    }
}
// -----------
// loai danh muc 
function addCateType(data){
    
}
function updateCate(id){
    let name = $('.show .nameType').val();
    let data = {
        nameType: name
    };
    console.log(data);
    console.log(id);
    axios.patch("/admin/tin-tuc/loai-danh-muc/"+id,data)
    .then((res) => {
        console.log(res.data);
        location.reload(true);
    })
    .catch((err) => {
        console.log(err);
    })
}
function deleteCateType(id){
    let confirmText = "Bạn có muốn xóa không ?";
    console.log(id);
    if (confirm(confirmText)) {
        axios.delete("/admin/tin-tuc/loai-danh-muc/"+id)
        .then((res) => {
            location.reload(true);
        })
        .catch((err) => {
            console.log(err);
        })
    }
}
// -------------------------

// danh muc
function updateCate(id){
    let name = $('.show .nameCate').val();
    let type = $('.show .nameType').val();
    axios.patch("/admin/tin-tuc/danh-muc/"+id,{nameCate:name,typeCate:type})
    .then((res) => {
        location.reload(true);
    })
    .catch((err) => {
        if(err) throw err;
    })
}
function deleteCate(id){
    let confirmText = "Bạn có muốn xóa không ?";
    if (confirm(confirmText)) {
        axios.delete("/admin/tin-tuc/danh-muc/"+id)
        .then((res) => {
            location.reload(true);
        })
        .catch((err) => {
            console.log(err);
        })
    }
  
}
// ------------------------
// linh vuc
function updateLV(id){
    let name = $('.show .nameField').val();
    axios.patch("/admin/linh-vuc/"+id,{nameField:name})
    .then((res) => {
        location.reload(true);
    })
    .catch((err) => {
        if(err) throw err;
    })
}
function deleteLV(id){
    let confirmText = "Bạn có muốn xóa không ?";
    if (confirm(confirmText)) {
        axios.delete("/admin/linh-vuc/"+id)
        .then((res) => {
            location.reload(true);
        })
        .catch((err) => {
            console.log(err);
        })
    }
  
}
//-----------------
// co quan ban hanh
function updateAg(id){
    let name = $('.show .nameAg').val();
    axios.patch("/admin/co-quan-ban-hanh/"+id,{nameAg:name})
    .then((res) => {
        location.reload(true);
    })
    .catch((err) => {
        if(err) throw err;
    })
}
function deleteAg(id){
    console.log(id);
    let confirmText = "Bạn có muốn xóa không ?";
    if (confirm(confirmText)) {
        axios.delete("/admin/co-quan-ban-hanh/"+id)
        .then((res) => {
            location.reload(true);
        })
        .catch((err) => {
            if(err) throw err;
        })
    }
   
}
//----------------------
// gop y
function deleteGY(id){
    let confirmText = "Bạn có muốn xóa không ?";
    if (confirm(confirmText)) {
        axios.delete("/admin/gop-y/"+id)
        .then((res) => {
            location.reload(true);
        })
        .catch((err) => {
            if(err) throw err;
        })
    } 
}
function updateCheck(id,i){
    axios.patch("/admin/gop-y/"+id)
        .then((res) => {
            $(".view"+i).css('background-color','#cecece47');
            $('#countGY').text(res.data.count);
        })
        .catch((err) => {
            if(err) throw err;
        })
}
//------------------------