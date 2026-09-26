import { el, visible, enabled } from "./utils.js";
import { copyText } from "./clipboard.js";

export function renderContactForm(config) {
  if (!enabled(config) || !visible(config.fields).length) return null;
  const status=el("p",{className:"form-status",attrs:{role:"status"}});
  const submit=el("button",{className:"button button--primary",text:config.buttonLabel || "Open email app",attrs:{type:"submit"}});
  const gmail=el("a",{className:"button",text:config.gmailLabel || "Open Gmail",attrs:{href:"https://mail.google.com/mail/?view=cm&fs=1",target:"_blank",rel:"noopener noreferrer"}});
  const copy=el("button",{className:"button",text:config.copyLabel || "Copy message",attrs:{type:"button"}});
  const manual=el("textarea",{className:"form-control copy-message-fallback",attrs:{readonly:"",hidden:true,rows:7,"aria-label":"Prepared message. Select and copy this text."}});
  const fields=visible(config.fields).map(field=>el("div",{className:"form-field"},[
    el("label",{text:field.label,attrs:{for:`contact-${field.id}`}}),
    el(field.type==="textarea"?"textarea":"input",{className:"form-control",attrs:{id:`contact-${field.id}`,name:field.id,type:field.type==="textarea"?undefined:field.type || "text",required:field.required,placeholder:field.placeholder,rows:field.type==="textarea"?5:undefined,autocomplete:field.id==="name"?"name":field.id==="email"?"email":undefined}})
  ]));
  const form=el("form",{className:"contact-form",attrs:{novalidate:""}},[el("h3",{className:"contact-form-title",text:config.title}),...fields,el("div",{className:"contact-form-actions"},[submit,config.showGmail!==false?gmail:null,config.showCopy!==false?copy:null]),manual,status]);
  form.style.maxWidth=config.maxWidth || "36rem";
  const draft=()=>{const v=Object.fromEntries(new FormData(form));return {subject:`Portfolio message from ${v.name || "a visitor"}`,body:`Name: ${v.name || ""}\nEmail: ${v.email || ""}\n\n${v.message || ""}`}};
  const valid=()=>{
    if (!form.reportValidity()) return false;
    if (!config.recipientEmail) {status.textContent="No recipient configured. Add recipientEmail in config/contact.js.";return false;}
    return true;
  };
  const updateGmail=()=>{const d=draft();gmail.href=`https://mail.google.com/mail/?${new URLSearchParams({view:"cm",fs:"1",to:config.recipientEmail || "",su:d.subject,body:d.body})}`};
  form.addEventListener("input",updateGmail); updateGmail();
  gmail.addEventListener("click",event=>{if(!valid()){event.preventDefault();return;}updateGmail();status.textContent="Gmail draft opened in a new tab. Send your message from Gmail."});
  copy.addEventListener("click",async()=>{
    if(!valid())return;
    const d=draft(),text=`To: ${config.recipientEmail}\nSubject: ${d.subject}\n\n${d.body}`;
    try {await copyText(text);status.textContent="Message copied. Paste it into your email service and send it there.";manual.hidden=true;}
    catch {manual.value=text;manual.hidden=false;manual.focus();manual.select();status.textContent="Select and copy the prepared message above, then paste it into your email service.";}
  });
  form.addEventListener("submit",async event=>{
    event.preventDefault(); if(!valid() || submit.disabled)return;
    if(config.deliveryMode==="endpoint") {
      if(!/^https?:\/\//.test(config.endpoint || "")){status.textContent="No sending service is configured. Use Gmail or copy your message.";return;}
      const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),Number(config.timeoutMs)||15000);
      submit.disabled=true;status.textContent="Sending…";
      try {const response=await fetch(config.endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(Object.fromEntries(new FormData(form))),signal:controller.signal});if(!response.ok)throw new Error();form.reset();updateGmail();status.textContent="Message accepted by the sending service. Thank you.";}
      catch {status.textContent="Message could not be sent. Your text is preserved; use Gmail or copy your message.";}
      finally {clearTimeout(timer);submit.disabled=false;}return;
    }
    const d=draft();window.location.href=`mailto:${config.recipientEmail}?subject=${encodeURIComponent(d.subject)}&body=${encodeURIComponent(d.body)}`;
    status.textContent=config.successMessage || "Email draft requested. Use Gmail or Copy message if no app opened.";
  });
  return form;
}
