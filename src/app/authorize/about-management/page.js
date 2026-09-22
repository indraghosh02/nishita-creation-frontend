

// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import Link from 'next/link';
// import {
//   Save, RotateCcw, Loader2, Plus, Trash2, Upload, X, ArrowUp, ArrowDown,
// } from 'lucide-react';
// import ProtectedRoute from '@/app/components/ProtectedRoute';
// import { toast } from 'sonner';

// const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// const SECTIONS = [
//   { id: 'hero',          label: 'Hero' },
//   { id: 'brandStory',    label: 'Brand Story' },
//   { id: 'journey',       label: 'Journey' },
//   { id: 'craftsmanship', label: 'Craftsmanship' },
//   { id: 'artisan',       label: 'Artisan' },
//   { id: 'gallery',       label: 'Gallery' },
//   { id: 'cta',           label: 'CTA' },
// ];

// const ICON_OPTIONS = [
//   'FaLeaf','FaHeart','FaUsers','FaStar','FaAward','FaShieldAlt','FaTruck',
//   'FaCheckCircle','FaShippingFast','FaGift','FaSmile','FaGem','FaHands',
//   'FaSeedling','FaGlobe','FaCalendarAlt','FaMapMarkerAlt','GiLipstick','GiSparkles',
// ];

// // ============================================================
// // IMAGE UPLOAD
// // ============================================================

// function ImageUpload({ imageUrl, onImageChange, onImageRemove, label = 'Image', aspectRatio = '1/1', size = 180 }) {
//   const ref = useRef(null);
//   const [uploading, setUploading] = useState(false);
//   const [preview, setPreview] = useState(imageUrl || '');
//   const [error, setError] = useState('');

//   useEffect(() => { setPreview(imageUrl || ''); }, [imageUrl]);

//   const validate = (f) => {
//     if (!['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(f.type)) return 'Only JPG/PNG/WebP.';
//     if (f.size > 5 * 1024 * 1024) return 'Max 5MB.';
//     return '';
//   };

//   const compress = (file) => new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = (e) => {
//       const img = new window.Image();
//       img.src = e.target.result;
//       img.onload = () => {
//         const c = document.createElement('canvas');
//         c.width = img.width; c.height = img.height;
//         c.getContext('2d').drawImage(img, 0, 0);
//         const q = file.size > 3e6 ? 0.3 : file.size > 1e6 ? 0.4 : 0.55;
//         c.toBlob((b) => resolve(new File([b], file.name.replace(/\.[^/.]+$/, '.jpg'), { type: 'image/jpeg' })), 'image/jpeg', q);
//       };
//       img.onerror = reject;
//     };
//     reader.onerror = reject;
//   });

//   const upload = async (file) => {
//     const comp = await compress(file);
//     const fd = new FormData();
//     fd.append('file', comp);
//     fd.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'smart-gadget');
//     const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, { method: 'POST', body: fd });
//     const data = await res.json();
//     if (!data.secure_url) throw new Error(data.error?.message || 'Upload failed');
//     return data.secure_url;
//   };

//   const handle = async (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     const err = validate(file);
//     if (err) { setError(err); toast.error(err); return; }
//     setError(''); setUploading(true);
//     try {
//       const r = new FileReader();
//       r.onload = (ev) => setPreview(ev.target.result);
//       r.readAsDataURL(file);
//       const url = await upload(file);
//       onImageChange(url);
//       toast.success('Uploaded');
//     } catch (e) {
//       console.error(e); setError('Upload failed'); toast.error('Upload failed'); setPreview('');
//     } finally { setUploading(false); }
//   };

//   const remove = () => {
//     setPreview(''); onImageRemove();
//     if (ref.current) ref.current.value = '';
//   };

//   return (
//     <div className="space-y-1">
//       {label && <label className="block text-xs font-medium text-gray-700">{label}</label>}
//       {preview ? (
//         <div className="relative inline-block">
//           <div className="overflow-hidden rounded-md border border-black bg-gray-100" style={{ width: size, aspectRatio }}>
//             <img src={preview} alt={label} className="h-full w-full object-cover" />
//           </div>
//           {uploading && (
//             <div className="absolute inset-0 flex items-center justify-center rounded-md bg-black/60">
//               <Loader2 className="h-5 w-5 animate-spin text-white" />
//             </div>
//           )}
//           <button type="button" onClick={remove} className="absolute -right-2 -top-2 rounded-full bg-black p-1 text-white hover:bg-gray-800">
//             <X className="h-3 w-3" />
//           </button>
//         </div>
//       ) : (
//         <button type="button" onClick={() => ref.current?.click()} disabled={uploading}
//           className="flex items-center gap-2 rounded-md bg-black px-3 py-2 text-xs text-white hover:bg-gray-800 disabled:opacity-50">
//           {uploading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Upload className="h-3 w-3" />}
//           {uploading ? 'Uploading…' : 'Upload'}
//         </button>
//       )}
//       <input ref={ref} type="file" accept="image/jpeg,image/jpg,image/png,image/webp" className="hidden" onChange={handle} disabled={uploading} />
//       {error && <p className="text-xs text-red-600">{error}</p>}
//     </div>
//   );
// }

// // ============================================================
// // REUSABLE INPUTS
// // ============================================================

// const Field = ({ label, value, onChange, placeholder, rows, type = 'text' }) => (
//   <div>
//     <label className="mb-1 block text-sm font-medium text-gray-800">{label}</label>
//     {rows ? (
//       <textarea value={value || ''} onChange={(e) => onChange(e.target.value)} rows={rows} placeholder={placeholder}
//         className="w-full resize-none rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-black outline-none focus:border-black focus:ring-1 focus:ring-black" />
//     ) : (
//       <input type={type} value={value || ''} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
//         className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-black outline-none focus:border-black focus:ring-1 focus:ring-black" />
//     )}
//   </div>
// );

// const ButtonFields = ({ title, button, onChange }) => (
//   <div className="rounded-md border border-gray-300 p-3">
//     <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-600">{title}</p>
//     <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
//       <Field label="Text" value={button?.text} onChange={(v) => onChange({ ...button, text: v })} />
//       <Field label="Link" value={button?.link} onChange={(v) => onChange({ ...button, link: v })} />
//       <div className="flex items-end">
//         <label className="flex items-center gap-2 text-xs text-gray-800">
//           <input type="checkbox" checked={button?.isActive !== false} onChange={(e) => onChange({ ...button, isActive: e.target.checked })} />
//           Active
//         </label>
//       </div>
//     </div>
//   </div>
// );

// // ============================================================
// // IMAGE ARRAY EDITOR (limit optional)
// // ============================================================

// function ImageArrayEditor({ title, images = [], onChange, max = null, aspectRatio = '1/1' }) {
//   const update = (i, patch) => { const c = [...images]; c[i] = { ...c[i], ...patch }; onChange(c); };
//   const add = () => onChange([...images, { url: '', alt: '', displayOrder: images.length, isActive: true }]);
//   const remove = (i) => onChange(images.filter((_, idx) => idx !== i));
//   const move = (i, dir) => {
//     const j = i + dir; if (j < 0 || j >= images.length) return;
//     const c = [...images]; [c[i], c[j]] = [c[j], c[i]];
//     onChange(c.map((img, idx) => ({ ...img, displayOrder: idx })));
//   };
//   const disabled = max !== null && images.length >= max;

//   return (
//     <div className="rounded-md border border-gray-300 p-3">
//       <div className="mb-2 flex items-center justify-between">
//         <p className="text-xs font-semibold uppercase tracking-wide text-gray-600">
//           {title} {max ? `(${images.length}/${max})` : `(${images.length})`}
//         </p>
//         <button type="button" onClick={add} disabled={disabled}
//           className="flex items-center gap-1 rounded-md bg-black px-2 py-1 text-xs text-white hover:bg-gray-800 disabled:opacity-40">
//           <Plus className="h-3 w-3" /> Add
//         </button>
//       </div>

//       {images.length === 0 && <p className="py-3 text-center text-xs text-gray-500">No images yet.</p>}

//       <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
//         {images.map((img, i) => (
//           <div key={i} className="rounded-md border border-gray-300 p-2">
//             <ImageUpload imageUrl={img.url}
//               onImageChange={(url) => update(i, { url })}
//               onImageRemove={() => update(i, { url: '' })}
//               label={`Image ${i + 1}`} aspectRatio={aspectRatio} size={120} />
//             <input type="text" value={img.alt || ''} onChange={(e) => update(i, { alt: e.target.value })}
//               placeholder="Alt text"
//               className="mt-2 w-full rounded border border-gray-300 px-2 py-1 text-xs text-black outline-none focus:border-black" />
//             <div className="mt-2 flex items-center justify-between">
//               <div className="flex gap-1">
//                 <button type="button" onClick={() => move(i, -1)} className="rounded bg-gray-100 p-1 text-gray-700 hover:bg-gray-200"><ArrowUp className="h-3 w-3" /></button>
//                 <button type="button" onClick={() => move(i, 1)}  className="rounded bg-gray-100 p-1 text-gray-700 hover:bg-gray-200"><ArrowDown className="h-3 w-3" /></button>
//               </div>
//               <button type="button" onClick={() => remove(i)} className="rounded p-1 text-black hover:bg-gray-200"><Trash2 className="h-3 w-3" /></button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// // ============================================================
// // MAIN ADMIN PAGE
// // ============================================================

// export default function AboutManagement() {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [activeTab, setActiveTab] = useState('hero');

//   useEffect(() => {
//     (async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) { toast.error('Please login first'); return; }
//         const res = await fetch(`${API_URL}/api/admin/about`, { headers: { Authorization: `Bearer ${token}` } });
//         const json = await res.json();
//         if (res.ok && json.success) setData(json.data);
//         else toast.error(json.error || 'Failed to load');
//       } catch (e) { console.error(e); toast.error('Network error'); }
//       finally { setLoading(false); }
//     })();
//   }, []);

//   const handleSave = async () => {
//     try {
//       setSaving(true);
//       const token = localStorage.getItem('token');
//       if (!token) { toast.error('Please login first'); return; }
//       const res = await fetch(`${API_URL}/api/admin/about`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
//         body: JSON.stringify(data),
//       });
//       const json = await res.json();
//       if (res.ok && json.success) { toast.success('About page updated'); setData(json.data); }
//       else toast.error(json.error || 'Failed to save');
//     } catch (e) { console.error(e); toast.error('Network error'); }
//     finally { setSaving(false); }
//   };

//   const handleReset = async () => {
//     if (!confirm('Reset to defaults?')) return;
//     try {
//       const token = localStorage.getItem('token');
//       const res = await fetch(`${API_URL}/api/admin/about/reset`, { method: 'POST', headers: { Authorization: `Bearer ${token}` } });
//       const json = await res.json();
//       if (res.ok && json.success) { toast.success('Reset done'); setData(json.data); }
//       else toast.error(json.error || 'Reset failed');
//     } catch { toast.error('Network error'); }
//   };

//   const patch = (section, partial) =>
//     setData((prev) => ({ ...prev, [section]: { ...prev[section], ...partial } }));

//   if (loading) {
//     return (
//       <ProtectedRoute pageKey="about_management">
//         <div className="flex min-h-screen items-center justify-center bg-white">
//           <Loader2 className="h-8 w-8 animate-spin text-black" />
//         </div>
//       </ProtectedRoute>
//     );
//   }
//   if (!data) return null;

//   // ----------------------------------------------------------
//   // PANELS
//   // ----------------------------------------------------------

//   const HeroPanel = (
//     <div className="space-y-4">
//       <Field label="Section Name" value={data.hero?.sectionName} onChange={(v) => patch('hero', { sectionName: v })} />
//       <ImageUpload imageUrl={data.hero?.image}
//         onImageChange={(url) => patch('hero', { image: url })}
//         onImageRemove={() => patch('hero', { image: '' })}
//         label="Hero Image (single)" aspectRatio="16/9" size={260} />
//       <Field label="Image Alt" value={data.hero?.imageAlt} onChange={(v) => patch('hero', { imageAlt: v })} />
//       <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
//         <Field label="Badge" value={data.hero?.badge} onChange={(v) => patch('hero', { badge: v })} />
//         <Field label="Title" value={data.hero?.title} onChange={(v) => patch('hero', { title: v })} />
//         <Field label="Highlighted Text" value={data.hero?.highlightedText} onChange={(v) => patch('hero', { highlightedText: v })} />
//       </div>
//       <Field label="Description" rows={3} value={data.hero?.description} onChange={(v) => patch('hero', { description: v })} />
//       <ButtonFields title="Primary Button" button={data.hero?.primaryButton} onChange={(b) => patch('hero', { primaryButton: b })} />
//     </div>
//   );

//   const BrandStoryPanel = (
//     <div className="space-y-4">
//       <Field label="Section Name" value={data.brandStory?.sectionName} onChange={(v) => patch('brandStory', { sectionName: v })} />
//       <ImageArrayEditor title="Brand Story Images (max 4)" max={4}
//         images={data.brandStory?.images || []}
//         onChange={(imgs) => patch('brandStory', { images: imgs })} aspectRatio="1/1" />
//       {/* <Field label="Image Caption (on first image)" value={data.brandStory?.imageCaption} onChange={(v) => patch('brandStory', { imageCaption: v })} /> */}
//       <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
//         <Field label="Badge" value={data.brandStory?.badge} onChange={(v) => patch('brandStory', { badge: v })} />
//         <Field label="Title" value={data.brandStory?.title} onChange={(v) => patch('brandStory', { title: v })} />
//         <Field label="Highlighted Text" value={data.brandStory?.highlightedText} onChange={(v) => patch('brandStory', { highlightedText: v })} />
//       </div>
//       <Field label="Description" rows={3} value={data.brandStory?.description} onChange={(v) => patch('brandStory', { description: v })} />

//       <div className="rounded-md border border-gray-300 p-3">
//         <div className="mb-2 flex items-center justify-between">
//           <p className="text-xs font-semibold uppercase tracking-wide text-gray-600">Features</p>
//           <button type="button"
//             onClick={() => patch('brandStory', { features: [...(data.brandStory?.features || []), { icon: 'FaLeaf', title: '', description: '', isActive: true }] })}
//             className="flex items-center gap-1 rounded-md bg-black px-2 py-1 text-xs text-white hover:bg-gray-800">
//             <Plus className="h-3 w-3" /> Add
//           </button>
//         </div>
//         {(data.brandStory?.features || []).map((f, i) => (
//           <div key={i} className="mb-2 grid grid-cols-1 items-end gap-2 rounded border border-gray-200 p-2 sm:grid-cols-[1fr_1fr_1fr_auto]">
//             <select value={f.icon || 'FaLeaf'}
//               onChange={(e) => { const c = [...data.brandStory.features]; c[i] = { ...c[i], icon: e.target.value }; patch('brandStory', { features: c }); }}
//               className="rounded-md border border-gray-300 px-2 py-1 text-sm text-black">
//               {ICON_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
//             </select>
//             <input type="text" value={f.title || ''}
//               onChange={(e) => { const c = [...data.brandStory.features]; c[i] = { ...c[i], title: e.target.value }; patch('brandStory', { features: c }); }}
//               placeholder="Title"
//               className="rounded-md border border-gray-300 px-2 py-1 text-sm text-black outline-none focus:border-black" />
//             <input type="text" value={f.description || ''}
//               onChange={(e) => { const c = [...data.brandStory.features]; c[i] = { ...c[i], description: e.target.value }; patch('brandStory', { features: c }); }}
//               placeholder="Description"
//               className="rounded-md border border-gray-300 px-2 py-1 text-sm text-black outline-none focus:border-black" />
//             <button type="button" onClick={() => patch('brandStory', { features: data.brandStory.features.filter((_, idx) => idx !== i) })}
//               className="rounded p-1 text-black hover:bg-gray-200"><Trash2 className="h-4 w-4" /></button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );

//   const JourneyPanel = (
//     <div className="space-y-4">
//       <Field label="Section Name" value={data.journey?.sectionName} onChange={(v) => patch('journey', { sectionName: v })} />
//       <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
//         <Field label="Badge" value={data.journey?.badge} onChange={(v) => patch('journey', { badge: v })} />
//         <Field label="Title" value={data.journey?.title} onChange={(v) => patch('journey', { title: v })} />
//         <Field label="Highlighted Text" value={data.journey?.highlightedText} onChange={(v) => patch('journey', { highlightedText: v })} />
//       </div>
//       <Field label="Description" rows={2} value={data.journey?.description} onChange={(v) => patch('journey', { description: v })} />

//       <div className="rounded-md border border-gray-300 p-3">
//         <div className="mb-2 flex items-center justify-between">
//           <p className="text-xs font-semibold uppercase tracking-wide text-gray-600">Timeline Items</p>
//           <button type="button"
//             onClick={() => patch('journey', { items: [...(data.journey?.items || []), { year: '', title: '', text: '', image: '', displayOrder: (data.journey?.items || []).length, isActive: true }] })}
//             className="flex items-center gap-1 rounded-md bg-black px-2 py-1 text-xs text-white hover:bg-gray-800">
//             <Plus className="h-3 w-3" /> Add
//           </button>
//         </div>
//         {(data.journey?.items || []).map((item, i) => (
//           <div key={i} className="mb-3 rounded-md border border-gray-200 p-3">
//             <div className="grid grid-cols-1 gap-3 sm:grid-cols-[120px_1fr_1fr]">
//               <ImageUpload imageUrl={item.image}
//                 onImageChange={(url) => { const c = [...data.journey.items]; c[i] = { ...c[i], image: url }; patch('journey', { items: c }); }}
//                 onImageRemove={() => { const c = [...data.journey.items]; c[i] = { ...c[i], image: '' }; patch('journey', { items: c }); }}
//                 label={`Item ${i + 1}`} aspectRatio="1/1" size={100} />
//               <Field label="Year" value={item.year} onChange={(v) => { const c = [...data.journey.items]; c[i] = { ...c[i], year: v }; patch('journey', { items: c }); }} />
//               <Field label="Title" value={item.title} onChange={(v) => { const c = [...data.journey.items]; c[i] = { ...c[i], title: v }; patch('journey', { items: c }); }} />
//             </div>
//             <div className="mt-2">
//               <Field label="Text" rows={2} value={item.text} onChange={(v) => { const c = [...data.journey.items]; c[i] = { ...c[i], text: v }; patch('journey', { items: c }); }} />
//             </div>
//             <div className="mt-2 flex justify-end">
//               <button type="button" onClick={() => patch('journey', { items: data.journey.items.filter((_, idx) => idx !== i) })}
//                 className="rounded p-1 text-black hover:bg-gray-200"><Trash2 className="h-4 w-4" /></button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );

//   const CraftsmanshipPanel = (
//     <div className="space-y-4">
//       <Field label="Section Name" value={data.craftsmanship?.sectionName} onChange={(v) => patch('craftsmanship', { sectionName: v })} />
//       <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
//         <Field label="Badge" value={data.craftsmanship?.badge} onChange={(v) => patch('craftsmanship', { badge: v })} />
//         <Field label="Title" value={data.craftsmanship?.title} onChange={(v) => patch('craftsmanship', { title: v })} />
//         <Field label="Highlighted Text" value={data.craftsmanship?.highlightedText} onChange={(v) => patch('craftsmanship', { highlightedText: v })} />
//       </div>
//       <Field label="Description" rows={2} value={data.craftsmanship?.description} onChange={(v) => patch('craftsmanship', { description: v })} />
//       <ButtonFields title="Button" button={data.craftsmanship?.button} onChange={(b) => patch('craftsmanship', { button: b })} />

//       <div className="rounded-md border border-gray-300 p-3">
//         <div className="mb-2 flex items-center justify-between">
//           <p className="text-xs font-semibold uppercase tracking-wide text-gray-600">Craft Cards</p>
//           <button type="button"
//             onClick={() => patch('craftsmanship', { cards: [...(data.craftsmanship?.cards || []), { title: '', subtitle: '', image: '', displayOrder: (data.craftsmanship?.cards || []).length, isActive: true }] })}
//             className="flex items-center gap-1 rounded-md bg-black px-2 py-1 text-xs text-white hover:bg-gray-800">
//             <Plus className="h-3 w-3" /> Add
//           </button>
//         </div>
//         <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
//           {(data.craftsmanship?.cards || []).map((c, i) => (
//             <div key={i} className="rounded-md border border-gray-200 p-3">
//               <ImageUpload imageUrl={c.image}
//                 onImageChange={(url) => { const cp = [...data.craftsmanship.cards]; cp[i] = { ...cp[i], image: url }; patch('craftsmanship', { cards: cp }); }}
//                 onImageRemove={() => { const cp = [...data.craftsmanship.cards]; cp[i] = { ...cp[i], image: '' }; patch('craftsmanship', { cards: cp }); }}
//                 label={`Card ${i + 1}`} aspectRatio="1/1" size={120} />
//               <div className="mt-2 space-y-2">
//                 <Field label="Title" value={c.title} onChange={(v) => { const cp = [...data.craftsmanship.cards]; cp[i] = { ...cp[i], title: v }; patch('craftsmanship', { cards: cp }); }} />
//                 <Field label="Subtitle" value={c.subtitle} onChange={(v) => { const cp = [...data.craftsmanship.cards]; cp[i] = { ...cp[i], subtitle: v }; patch('craftsmanship', { cards: cp }); }} />
//               </div>
//               <div className="mt-2 flex justify-end">
//                 <button type="button" onClick={() => patch('craftsmanship', { cards: data.craftsmanship.cards.filter((_, idx) => idx !== i) })}
//                   className="rounded p-1 text-black hover:bg-gray-200"><Trash2 className="h-4 w-4" /></button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );

//   const ArtisanPanel = (
//     <div className="space-y-4">
//       <Field label="Section Name" value={data.artisan?.sectionName} onChange={(v) => patch('artisan', { sectionName: v })} />
//       <ImageUpload imageUrl={data.artisan?.image}
//         onImageChange={(url) => patch('artisan', { image: url })}
//         onImageRemove={() => patch('artisan', { image: '' })}
//         label="Artisan Image (single)" aspectRatio="4/3" size={240} />
//       <Field label="Image Alt" value={data.artisan?.imageAlt} onChange={(v) => patch('artisan', { imageAlt: v })} />
//       <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
//         <Field label="Badge" value={data.artisan?.badge} onChange={(v) => patch('artisan', { badge: v })} />
//         <Field label="Title" value={data.artisan?.title} onChange={(v) => patch('artisan', { title: v })} />
//         <Field label="Highlighted Text" value={data.artisan?.highlightedText} onChange={(v) => patch('artisan', { highlightedText: v })} />
//       </div>
//       <Field label="Description" rows={2} value={data.artisan?.description} onChange={(v) => patch('artisan', { description: v })} />
//       <Field label="Quote" rows={3} value={data.artisan?.quote} onChange={(v) => patch('artisan', { quote: v })} />
//       <Field label="Quote Author" value={data.artisan?.quoteAuthor} onChange={(v) => patch('artisan', { quoteAuthor: v })} />
//       <ButtonFields title="Button" button={data.artisan?.button} onChange={(b) => patch('artisan', { button: b })} />
//     </div>
//   );

//   const GalleryPanel = (
//     <div className="space-y-4">
//       <Field label="Section Name" value={data.gallery?.sectionName} onChange={(v) => patch('gallery', { sectionName: v })} />
//       <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
//         <Field label="Badge" value={data.gallery?.badge} onChange={(v) => patch('gallery', { badge: v })} />
//         <Field label="Title" value={data.gallery?.title} onChange={(v) => patch('gallery', { title: v })} />
//       </div>
//       <Field label="Description" rows={2} value={data.gallery?.description} onChange={(v) => patch('gallery', { description: v })} />
//       <ImageArrayEditor title="Gallery Images (unlimited)" images={data.gallery?.images || []}
//         onChange={(imgs) => patch('gallery', { images: imgs })} aspectRatio="1/1" />
//     </div>
//   );

//   const CTAPanel = (
//     <div className="space-y-4">
//       <Field label="Section Name" value={data.cta?.sectionName} onChange={(v) => patch('cta', { sectionName: v })} />
//       <ImageUpload imageUrl={data.cta?.backgroundImage}
//         onImageChange={(url) => patch('cta', { backgroundImage: url })}
//         onImageRemove={() => patch('cta', { backgroundImage: '' })}
//         label="Background Image (single)" aspectRatio="16/9" size={260} />
//       <Field label="Title" value={data.cta?.title} onChange={(v) => patch('cta', { title: v })} />
//       <Field label="Description" rows={3} value={data.cta?.description} onChange={(v) => patch('cta', { description: v })} />
//       <ButtonFields title="Primary Button" button={data.cta?.primaryButton} onChange={(b) => patch('cta', { primaryButton: b })} />
//     </div>
//   );

//   const PANELS = {
//     hero: HeroPanel,
//     brandStory: BrandStoryPanel,
//     journey: JourneyPanel,
//     craftsmanship: CraftsmanshipPanel,
//     artisan: ArtisanPanel,
//     gallery: GalleryPanel,
//     cta: CTAPanel,
//   };

//   return (
//     <ProtectedRoute pageKey="about_management">
//       <div className="min-h-screen bg-white text-black">
//         {/* Header */}
//         <div className="sticky top-0 z-10 border-b border-gray-200 bg-white">
//           <div className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-4">
//             <div>
//               <h1 className="text-lg font-bold sm:text-2xl">About Page Management</h1>
//               <p className="mt-0.5 text-xs text-gray-600 sm:text-sm">
//                 Nishita's Collection — everything is editable
//               </p>
//             </div>
//             <div className="flex items-center gap-2">
//               <button onClick={handleReset}
//                 className="flex items-center gap-1.5 rounded-md border border-gray-300 px-3 py-1.5 text-xs text-black hover:bg-gray-100 sm:text-sm">
//                 <RotateCcw className="h-4 w-4" /> Reset
//               </button>
//               <Link href="/about" target="_blank"
//                 className="rounded-md border border-gray-300 px-3 py-1.5 text-xs text-black hover:bg-gray-100 sm:text-sm">
//                 Preview
//               </Link>
//             </div>
//           </div>
//         </div>

//         {/* Body */}
//         <div className="p-4 sm:p-6">
//           <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-6">
//             {/* Tabs */}
//             <div className="flex flex-wrap gap-2 rounded-md border border-gray-200 bg-white p-3">
//               {SECTIONS.map((s) => (
//                 <button key={s.id} type="button" onClick={() => setActiveTab(s.id)}
//                   className={`rounded-md px-3 py-2 text-sm font-medium transition ${
//                     activeTab === s.id ? 'bg-black text-white' : 'text-gray-700 hover:bg-gray-100'
//                   }`}>
//                   {s.label}
//                 </button>
//               ))}
//             </div>

//             {/* Panel */}
//             <div className="rounded-md border border-gray-200 bg-white p-4 sm:p-6">
//               {PANELS[activeTab]}
//             </div>

//             {/* Save */}
//             <div className="flex justify-end border-t border-gray-200 pt-4">
//               <button type="submit" disabled={saving}
//                 className="flex items-center gap-2 rounded-md bg-black px-6 py-3 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50">
//                 {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
//                 {saving ? 'Saving…' : 'Save About Page'}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </ProtectedRoute>
//   );
// }


'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Save, RotateCcw, Loader2, Plus, Trash2, Upload, X, ArrowUp, ArrowDown,
} from 'lucide-react';
import ProtectedRoute from '@/app/components/ProtectedRoute';
import { toast } from 'sonner';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const SECTIONS = [
  { id: 'hero',      label: 'Hero' },
  { id: 'quick',     label: 'Quick Contact' },
  { id: 'social',    label: 'Social Links' },
  { id: 'map',       label: 'Map' },
  { id: 'cta',       label: 'CTA' },
  { id: 'form',      label: 'Form' },
];

const QUICK_ICON_OPTIONS = [
  { value: 'FaPhone',         label: 'Phone' },
  { value: 'FaWhatsapp',      label: 'WhatsApp' },
  { value: 'FaEnvelope',      label: 'Email' },
  { value: 'FaMapMarkerAlt',  label: 'Location' },
  { value: 'FaClock',         label: 'Clock' },
];

const SOCIAL_PLATFORMS = [
  { value: 'facebook',  icon: 'FaFacebookF',  label: 'Facebook',  color: 'hover:bg-[#1877F2]' },
  { value: 'instagram', icon: 'FaInstagram',  label: 'Instagram', color: 'hover:bg-[#E4405F]' },
  { value: 'x',         icon: 'FaTwitter',    label: 'X (Twitter)', color: 'hover:bg-[#000000]' },
  { value: 'youtube',   icon: 'FaYoutube',    label: 'YouTube',   color: 'hover:bg-[#FF0000]' },
  { value: 'tiktok',    icon: 'FaTiktok',     label: 'TikTok',    color: 'hover:bg-[#000000]' },
  { value: 'pinterest', icon: 'FaPinterest',  label: 'Pinterest', color: 'hover:bg-[#BD081C]' },
  { value: 'linkedin',  icon: 'FaLinkedinIn', label: 'LinkedIn',  color: 'hover:bg-[#0A66C2]' },
  { value: 'telegram',  icon: 'FaTelegram',   label: 'Telegram',  color: 'hover:bg-[#26A5E4]' },
  { value: 'viber',     icon: 'FaViber',      label: 'Viber',     color: 'hover:bg-[#7360F2]' },
  { value: 'messenger', icon: 'FaFacebookMessenger', label: 'Messenger', color: 'hover:bg-[#00B2FF]' },
];

// ============================================================
// IMAGE UPLOAD
// ============================================================

function ImageUpload({ imageUrl, onImageChange, onImageRemove, label = 'Image', aspectRatio = '16/9', size = 220 }) {
  const ref = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(imageUrl || '');
  const [error, setError] = useState('');

  useEffect(() => { setPreview(imageUrl || ''); }, [imageUrl]);

  const validate = (f) => {
    if (!['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(f.type)) return 'Only JPG/PNG/WebP.';
    if (f.size > 5 * 1024 * 1024) return 'Max 5MB.';
    return '';
  };

  const compress = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const img = new window.Image();
      img.src = e.target.result;
      img.onload = () => {
        const c = document.createElement('canvas');
        c.width = img.width; c.height = img.height;
        c.getContext('2d').drawImage(img, 0, 0);
        const q = file.size > 3e6 ? 0.3 : file.size > 1e6 ? 0.4 : 0.55;
        c.toBlob((b) => resolve(new File([b], file.name.replace(/\.[^/.]+$/, '.jpg'), { type: 'image/jpeg' })), 'image/jpeg', q);
      };
      img.onerror = reject;
    };
    reader.onerror = reject;
  });

  const upload = async (file) => {
    const comp = await compress(file);
    const fd = new FormData();
    fd.append('file', comp);
    fd.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'smart-gadget');
    const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, { method: 'POST', body: fd });
    const data = await res.json();
    if (!data.secure_url) throw new Error(data.error?.message || 'Upload failed');
    return data.secure_url;
  };

  const handle = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const err = validate(file);
    if (err) { setError(err); toast.error(err); return; }
    setError(''); setUploading(true);
    try {
      const r = new FileReader();
      r.onload = (ev) => setPreview(ev.target.result);
      r.readAsDataURL(file);
      const url = await upload(file);
      onImageChange(url);
      toast.success('Uploaded');
    } catch (e) {
      console.error(e); setError('Upload failed'); toast.error('Upload failed'); setPreview('');
    } finally { setUploading(false); }
  };

  const remove = () => {
    setPreview(''); onImageRemove();
    if (ref.current) ref.current.value = '';
  };

  return (
    <div className="space-y-1">
      {label && <label className="block text-xs font-medium text-gray-700">{label}</label>}
      {preview ? (
        <div className="relative inline-block">
          <div className="overflow-hidden rounded-md border border-black bg-gray-100" style={{ width: size, aspectRatio }}>
            <img src={preview} alt={label} className="h-full w-full object-cover" />
          </div>
          {uploading && (
            <div className="absolute inset-0 flex items-center justify-center rounded-md bg-black/60">
              <Loader2 className="h-5 w-5 animate-spin text-white" />
            </div>
          )}
          <button type="button" onClick={remove} className="absolute -right-2 -top-2 rounded-full bg-black p-1 text-white hover:bg-gray-800">
            <X className="h-3 w-3" />
          </button>
        </div>
      ) : (
        <button type="button" onClick={() => ref.current?.click()} disabled={uploading}
          className="flex items-center gap-2 rounded-md bg-black px-3 py-2 text-xs text-white hover:bg-gray-800 disabled:opacity-50">
          {uploading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Upload className="h-3 w-3" />}
          {uploading ? 'Uploading…' : 'Upload'}
        </button>
      )}
      <input ref={ref} type="file" accept="image/jpeg,image/jpg,image/png,image/webp" className="hidden" onChange={handle} disabled={uploading} />
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}

// ============================================================
// SMALL FIELDS
// ============================================================

const Field = ({ label, value, onChange, placeholder, rows, type = 'text' }) => (
  <div>
    <label className="mb-1 block text-sm font-medium text-gray-800">{label}</label>
    {rows ? (
      <textarea value={value || ''} onChange={(e) => onChange(e.target.value)} rows={rows} placeholder={placeholder}
        className="w-full resize-none rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-black outline-none focus:border-black focus:ring-1 focus:ring-black" />
    ) : (
      <input type={type} value={value || ''} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-black outline-none focus:border-black focus:ring-1 focus:ring-black" />
    )}
  </div>
);

// ============================================================
// MAIN ADMIN PAGE
// ============================================================

export default function ContactManagement() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('hero');

  // ---- fetch ----
  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) { toast.error('Please login first'); return; }
        const res = await fetch(`${API_URL}/api/contact/admin`, { headers: { Authorization: `Bearer ${token}` } });
        const json = await res.json();
        if (res.ok && json.success) setData(json.data);
        else toast.error(json.error || 'Failed to load');
      } catch (e) { console.error(e); toast.error('Network error'); }
      finally { setLoading(false); }
    })();
  }, []);

  // ---- save ----
  const handleSave = async () => {
    try {
      setSaving(true);
      const token = localStorage.getItem('token');
      if (!token) { toast.error('Please login first'); return; }
      const res = await fetch(`${API_URL}/api/contact/admin`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (res.ok && json.success) { toast.success('Contact page updated'); setData(json.data); }
      else toast.error(json.error || 'Failed to save');
    } catch (e) { console.error(e); toast.error('Network error'); }
    finally { setSaving(false); }
  };

  // ---- reset ----
  const handleReset = async () => {
    if (!confirm('Reset the contact page to defaults? This cannot be undone.')) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/contact/admin/reset`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (res.ok && json.success) { toast.success('Reset to defaults'); setData(json.data); }
      else toast.error(json.error || 'Reset failed');
    } catch { toast.error('Network error'); }
  };

  const patch = (section, partial) =>
    setData((prev) => ({ ...prev, [section]: { ...prev[section], ...partial } }));

  if (loading) {
    return (
      <ProtectedRoute pageKey="contact_management">
        <div className="flex min-h-screen items-center justify-center bg-white">
          <Loader2 className="h-8 w-8 animate-spin text-black" />
        </div>
      </ProtectedRoute>
    );
  }
  if (!data) return null;

  // ----------------------------------------------------------
  // PANELS
  // ----------------------------------------------------------

  // ---- HERO ----
  const HeroPanel = (
    <div className="space-y-3">
      <ImageUpload imageUrl={data.hero?.bgImage}
        onImageChange={(url) => patch('hero', { bgImage: url })}
        onImageRemove={() => patch('hero', { bgImage: '' })}
        label="Hero Background Image" aspectRatio="16/9" size={260} />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Field label="Badge" value={data.hero?.badge} onChange={(v) => patch('hero', { badge: v })} />
        <Field label="Title" value={data.hero?.title} onChange={(v) => patch('hero', { title: v })} />
        <Field label="Highlighted Text" value={data.hero?.highlightText} onChange={(v) => patch('hero', { highlightText: v })} />
      </div>
      <Field label="Description" rows={3} value={data.hero?.description} onChange={(v) => patch('hero', { description: v })} />
    </div>
  );

  // ---- QUICK CONTACT ----
  const QuickPanel = (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-800">Quick Contact Cards (max 3 on public page)</p>
        <button
          type="button"
          onClick={() =>
            setData((prev) => ({
              ...prev,
              quickContacts: [
                ...(prev.quickContacts || []),
                { icon: 'FaPhone', label: '', value: '', link: '', description: '', isActive: true, displayOrder: (prev.quickContacts || []).length },
              ],
            }))
          }
          className="flex items-center gap-1 rounded-md bg-black px-2 py-1 text-xs text-white hover:bg-gray-800"
        >
          <Plus className="h-3 w-3" /> Add
        </button>
      </div>

      {(data.quickContacts || []).map((item, i) => (
        <div key={i} className="rounded-md border border-gray-300 p-3">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-700">Icon</label>
              <select
                value={item.icon}
                onChange={(e) => {
                  const c = [...data.quickContacts]; c[i] = { ...c[i], icon: e.target.value };
                  setData((p) => ({ ...p, quickContacts: c }));
                }}
                className="w-full rounded-md border border-gray-300 bg-white px-2 py-1 text-sm text-black"
              >
                {QUICK_ICON_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            <Field label="Label" value={item.label}
              onChange={(v) => { const c = [...data.quickContacts]; c[i] = { ...c[i], label: v }; setData((p) => ({ ...p, quickContacts: c })); }} />
            <Field label="Value" value={item.value}
              onChange={(v) => { const c = [...data.quickContacts]; c[i] = { ...c[i], value: v }; setData((p) => ({ ...p, quickContacts: c })); }} />
            <Field label="Link" value={item.link}
              onChange={(v) => { const c = [...data.quickContacts]; c[i] = { ...c[i], link: v }; setData((p) => ({ ...p, quickContacts: c })); }} />
          </div>
          <div className="mt-2">
            <Field label="Description" rows={2} value={item.description}
              onChange={(v) => { const c = [...data.quickContacts]; c[i] = { ...c[i], description: v }; setData((p) => ({ ...p, quickContacts: c })); }} />
          </div>
          <div className="mt-2 flex items-center justify-between">
            <label className="flex items-center gap-2 text-xs text-gray-700">
              <input type="checkbox" checked={item.isActive !== false}
                onChange={(e) => { const c = [...data.quickContacts]; c[i] = { ...c[i], isActive: e.target.checked }; setData((p) => ({ ...p, quickContacts: c })); }} />
              Active
            </label>
            <div className="flex items-center gap-1">
              <button type="button" onClick={() => {
                if (i === 0) return;
                const c = [...data.quickContacts]; [c[i - 1], c[i]] = [c[i], c[i - 1]];
                c.forEach((x, idx) => x.displayOrder = idx);
                setData((p) => ({ ...p, quickContacts: c }));
              }} className="rounded bg-gray-100 p-1 hover:bg-gray-200"><ArrowUp className="h-3 w-3" /></button>
              <button type="button" onClick={() => {
                if (i === data.quickContacts.length - 1) return;
                const c = [...data.quickContacts]; [c[i + 1], c[i]] = [c[i], c[i + 1]];
                c.forEach((x, idx) => x.displayOrder = idx);
                setData((p) => ({ ...p, quickContacts: c }));
              }} className="rounded bg-gray-100 p-1 hover:bg-gray-200"><ArrowDown className="h-3 w-3" /></button>
              <button type="button"
                onClick={() => setData((p) => ({ ...p, quickContacts: p.quickContacts.filter((_, idx) => idx !== i) }))}
                className="rounded p-1 text-black hover:bg-gray-200"><Trash2 className="h-3 w-3" /></button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // ---- SOCIAL ----
  const SocialPanel = (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-800">Social Links</p>
        <button
          type="button"
          onClick={() =>
            setData((prev) => ({
              ...prev,
              socialLinks: [
                ...(prev.socialLinks || []),
                { platform: 'facebook', url: '', icon: 'FaFacebookF', color: 'hover:bg-[#1877F2]', isActive: true, displayOrder: (prev.socialLinks || []).length },
              ],
            }))
          }
          className="flex items-center gap-1 rounded-md bg-black px-2 py-1 text-xs text-white hover:bg-gray-800"
        >
          <Plus className="h-3 w-3" /> Add
        </button>
      </div>

      {(data.socialLinks || []).map((item, i) => (
        <div key={i} className="rounded-md border border-gray-300 p-3">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-700">Platform</label>
              <select
                value={item.platform}
                onChange={(e) => {
                  const p = SOCIAL_PLATFORMS.find((x) => x.value === e.target.value);
                  const c = [...data.socialLinks];
                  c[i] = { ...c[i], platform: e.target.value, icon: p?.icon || 'FaFacebookF', color: p?.color || '' };
                  setData((prev) => ({ ...prev, socialLinks: c }));
                }}
                className="w-full rounded-md border border-gray-300 bg-white px-2 py-1 text-sm text-black"
              >
                {SOCIAL_PLATFORMS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            <Field label="URL" value={item.url}
              onChange={(v) => { const c = [...data.socialLinks]; c[i] = { ...c[i], url: v }; setData((p) => ({ ...p, socialLinks: c })); }} />
          </div>
          <div className="mt-2 flex items-center justify-between">
            <label className="flex items-center gap-2 text-xs text-gray-700">
              <input type="checkbox" checked={item.isActive !== false}
                onChange={(e) => { const c = [...data.socialLinks]; c[i] = { ...c[i], isActive: e.target.checked }; setData((p) => ({ ...p, socialLinks: c })); }} />
              Active
            </label>
            <button type="button"
              onClick={() => setData((p) => ({ ...p, socialLinks: p.socialLinks.filter((_, idx) => idx !== i) }))}
              className="rounded p-1 text-black hover:bg-gray-200"><Trash2 className="h-3 w-3" /></button>
          </div>
        </div>
      ))}
    </div>
  );

  // ---- MAP ----
  const MapPanel = (
    <div className="space-y-3">
      <Field label="Map Title" value={data.map?.title} onChange={(v) => patch('map', { title: v })} />
      <Field label="Google Maps Embed URL" rows={4} value={data.map?.embedCode}
        onChange={(v) => patch('map', { embedCode: v })}
        placeholder="https://www.google.com/maps?q=... or full iframe code" />
      <p className="text-xs text-gray-500">Paste either the URL or the full iframe — we'll extract the src automatically.</p>
    </div>
  );

  // ---- CTA ----
  const CTAPanel = (
    <div className="space-y-3">
      <ImageUpload imageUrl={data.cta?.bgImage}
        onImageChange={(url) => patch('cta', { bgImage: url })}
        onImageRemove={() => patch('cta', { bgImage: '' })}
        label="CTA Background Image (single)" aspectRatio="16/9" size={240} />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Field label="Badge" value={data.cta?.badge} onChange={(v) => patch('cta', { badge: v })} />
        <Field label="Title" value={data.cta?.title} onChange={(v) => patch('cta', { title: v })} />
      </div>
      <Field label="Description" rows={2} value={data.cta?.description} onChange={(v) => patch('cta', { description: v })} />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Field label="Primary Button Text" value={data.cta?.buttonText} onChange={(v) => patch('cta', { buttonText: v })} />
        <Field label="Primary Button Link" value={data.cta?.buttonLink} onChange={(v) => patch('cta', { buttonLink: v })} />
        <Field label="Secondary Button Text" value={data.cta?.secondaryButtonText} onChange={(v) => patch('cta', { secondaryButtonText: v })} />
        <Field label="Secondary Button Link" value={data.cta?.secondaryButtonLink} onChange={(v) => patch('cta', { secondaryButtonLink: v })} />
      </div>
    </div>
  );

  // ---- FORM COPY ----
  const FormPanel = (
    <div className="space-y-3">
      <Field label="Form Title" value={data.form?.title} onChange={(v) => patch('form', { title: v })} />
      <Field label="Form Description" rows={2} value={data.form?.description} onChange={(v) => patch('form', { description: v })} />
      <Field label="Success Message" rows={2} value={data.form?.successMessage} onChange={(v) => patch('form', { successMessage: v })} />
    </div>
  );

  const PANELS = {
    hero: HeroPanel,
    quick: QuickPanel,
    social: SocialPanel,
    map: MapPanel,
    cta: CTAPanel,
    form: FormPanel,
  };

  return (
    <ProtectedRoute pageKey="contact_management">
      <div className="min-h-screen bg-white text-black">

        {/* Header */}
        <div className="sticky top-0 z-10 border-b border-gray-200 bg-white">
          <div className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-4">
            <div>
              <h1 className="text-lg font-bold sm:text-2xl">Contact Page Management</h1>
              <p className="mt-0.5 text-xs text-gray-600 sm:text-sm">
                Nishita's Collection — everything is editable
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={handleReset}
                className="flex items-center gap-1.5 rounded-md border border-gray-300 px-3 py-1.5 text-xs text-black hover:bg-gray-100 sm:text-sm">
                <RotateCcw className="h-4 w-4" /> Reset
              </button>
              <Link href="/contact" target="_blank"
                className="rounded-md border border-gray-300 px-3 py-1.5 text-xs text-black hover:bg-gray-100 sm:text-sm">
                Preview
              </Link>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6">
          <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-4">
            {/* Tabs */}
            <div className="flex flex-wrap gap-2 rounded-md border border-gray-200 bg-white p-3">
              {SECTIONS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActiveTab(s.id)}
                  className={`rounded-md px-3 py-2 text-sm font-medium transition ${
                    activeTab === s.id ? 'bg-black text-white' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            {/* Panel */}
            <div className="rounded-md border border-gray-200 bg-white p-4 sm:p-6">
              {PANELS[activeTab]}
            </div>

            {/* Save */}
            <div className="flex justify-end border-t border-gray-200 pt-4">
              <button type="submit" disabled={saving}
                className="flex items-center gap-2 rounded-md bg-black px-6 py-3 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50">
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                {saving ? 'Saving…' : 'Save Contact Page'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </ProtectedRoute>
  );
}