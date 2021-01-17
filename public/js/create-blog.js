var toolbarOptions = [
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    ['bold', 'italic', 'underline', 'strike'],        
    ['blockquote', 'code-block'],

    [{ 'font': [] }],
    ['image', 'link'],
               
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],   

    [{ 'indent': '+1' }],                             
  
    [{ 'color': [] }, { 'background': [] }],
    [{ 'align': [] }], 
  
    ['clean']                                         
  ];
  
  var quill = new Quill('#editor', {
    modules: {
      toolbar: toolbarOptions
    },
    placeholder: 'gg',
    theme: 'snow'
  });