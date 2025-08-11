// app/questionnaire/page.tsx

'use client'; // This must be the first line to use hooks and handle events

import { useState, ChangeEvent, FormEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

// A comprehensive interface for the entire form's data
interface FullFormData {
  // Section 1
  locationType: string;
  locationDetail: string;
  country: string;
  // Section 2
  violationDate: string;
  violationTime: string;
  // Section 3
  brandName: string;
  companyName: string;
  flavorSource: string;
  // Section 4
  productType: string;
  // Section 5
  violationCategories: string[];
  // Section 6
  promoTechniques: string[];
  // Section 7
  evidenceFile: File | null;
  // Section 8
  requiredDetails: string[];
  prohibitedDetails: string[];
  // Section 9
  reporterName: string;
  reporterAddress: string;
  reporterEmail: string;
  reporterMobile: string;
}

export default function QuestionnairePage() {
  // State management for the full form
  const [formData, setFormData] = useState<FullFormData>({
    locationType: '',
    locationDetail: '',
    country: '',
    violationDate: '',
    violationTime: '',
    brandName: '',
    companyName: '',
    flavorSource: '',
    productType: '',
    violationCategories: [],
    promoTechniques: [],
    evidenceFile: null,
    requiredDetails: [],
    prohibitedDetails: [],
    reporterName: '',
    reporterAddress: '',
    reporterEmail: '',
    reporterMobile: '',
  });

  // Event handlers for state updates
  const handleMultiCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    const currentValues = formData[name as keyof FullFormData] as string[];
    
    setFormData(prevState => ({
      ...prevState,
      [name]: checked
        ? [...currentValues, value]
        : currentValues.filter(item => item !== value),
    }));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'file') {
      const file = (e.target as HTMLInputElement).files?.[0] || null;
      setFormData(prevState => ({ ...prevState, [name]: file }));
    } else {
      setFormData(prevState => ({ ...prevState, [name]: value }));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Full Form Data Submitted:", formData);
    alert('Thank you for testing! The complete form data has been logged to the console.');
  };

  // Helper components for cleaner JSX
  const Section = ({ title, number, children }: { title: string; number: number; children: React.ReactNode }) => (
    <div className="p-6 border border-gray-200 rounded-lg">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">{number}. {title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );

  const Checkbox = ({ name, value, label }: { name: keyof FullFormData; value:string; label: string }) => (
     <div className="flex items-center">
        <input type="checkbox" name={name} value={value} id={`${name}_${value.replace(/\s+/g, '')}`} onChange={handleMultiCheckboxChange} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
        <label htmlFor={`${name}_${value.replace(/\s+/g, '')}`} className="ml-3 text-sm text-gray-700">{label}</label>
     </div>
  );

  return (
    <main className="flex min-h-screen flex-col bg-gray-50">
      <nav className="flex items-center justify-between p-6 bg-white shadow-sm">
        <Link href="/">
            <Image
              src="/logoZ.png"
              width={150}
              height={150}
              alt="IBFAN Logo"
            />
        </Link>
        <Link
          href="/"
          className="rounded-lg px-4 py-2 text-base font-medium text-gray-600 transition-colors hover:bg-gray-100"
        >
          Home
        </Link>
      </nav>

      <div className="grow flex items-center justify-center py-12 px-4">
        <form onSubmit={handleSubmit} className="space-y-8 p-8 bg-white rounded-xl shadow-lg max-w-4xl w-full">
            <h1 className={`${lusitana.className} text-3xl md:text-4xl font-bold tracking-tight text-gray-900 border-b pb-4`}>
                Code Violation Monitoring Form
            </h1>
            
            {/* All form sections are now included */}
            <Section number={1} title="Where was the violation noted?">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location Type</label>
                    <select name="locationType" value={formData.locationType} onChange={handleChange} className="w-full p-2 border-gray-300 rounded-md shadow-sm bg-white">
                        <option value="">Select a type...</option>
                        <option value="Health Facility">Health Facility</option>
                        <option value="Retail Store">Retail Store</option>
                        <option value="Social Media">Social Media</option>
                        <option value="Mainstream Media">Mainstream Media</option>
                        <option value="Other">Other</option>
                    </select>
                    </div>
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location Detail (e.g., store name, Facebook page)</label>
                    <input type="text" name="locationDetail" value={formData.locationDetail} onChange={handleChange} className="w-full p-2 border-gray-300 rounded-md shadow-sm" />
                    </div>
                    <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                    <select name="country" value={formData.country} onChange={handleChange} className="w-full p-2 border-gray-300 rounded-md shadow-sm bg-white">
                        <option value="">Select a Country...</option>
                        <optgroup label="Southern Africa"><option value="South Africa">South Africa</option></optgroup>
                        <optgroup label="Eastern Africa"><option value="Kenya">Kenya</option></optgroup>
                    </select>
                    </div>
                </div>
            </Section>

            <Section number={2} title="When did the violation occur?">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Violation</label>
                  <input type="date" name="violationDate" value={formData.violationDate} onChange={handleChange} className="w-full p-2 border-gray-300 rounded-md shadow-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time of Violation</label>
                  <input type="time" name="violationTime" value={formData.violationTime} onChange={handleChange} className="w-full p-2 border-gray-300 rounded-md shadow-sm" />
                </div>
              </div>
            </Section>

            <Section number={3} title="What product was involved?">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Brand Name</label>
                  <input type="text" name="brandName" value={formData.brandName} onChange={handleChange} className="w-full p-2 border-gray-300 rounded-md shadow-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                  <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} className="w-full p-2 border-gray-300 rounded-md shadow-sm" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Flavor / Source (if applicable)</label>
                  <input type="text" name="flavorSource" value={formData.flavorSource} onChange={handleChange} className="w-full p-2 border-gray-300 rounded-md shadow-sm" />
                </div>
              </div>
            </Section>

            <Section number={4} title="What is the product type?">
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Type</label>
              <select name="productType" value={formData.productType} onChange={handleChange} className="w-full p-2 border-gray-300 rounded-md shadow-sm bg-white">
                <option value="">Select a type...</option>
                <option value="Infant Formula (0+ months)">Infant Formula (0+ months)</option>
                <option value="Follow-on Formula (6+ months)">Follow-on Formula (6+ months)</option>
                <option value="Growing-up Milk (12+ months)">Growing-up Milk (12+ months)</option>
                <option value="Feeding Bottles or Teats">Feeding Bottles or Teats</option>
                <option value="Other Foods/Liquids for Infants">Other Foods/Liquids for Infants</option>
                <option value="Practices that undermine Breastfeeding">Practices that undermine Breastfeeding</option>
              </select>
            </Section>

            <Section number={5} title="What is the category of violation?">
              <fieldset>
                <legend className="sr-only">Category of Violation</legend>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <Checkbox name="violationCategories" value="Advertisement" label="Advertisement" />
                  <Checkbox name="violationCategories" value="Retail Promotion" label="Retail Promotion" />
                  <Checkbox name="violationCategories" value="Promotion in Health Facilities" label="Promotion in Health Facilities" />
                  <Checkbox name="violationCategories" value="Sponsorship" label="Sponsorship" />
                  <Checkbox name="violationCategories" value="Inadequate Labelling" label="Inadequate Labelling" />
                  <Checkbox name="violationCategories" value="Health and Nutrition Claims" label="Health & Nutrition Claims" />
                </div>
              </fieldset>
            </Section>
            
            <Section number={6} title="What promotional techniques were used?">
                <fieldset>
                  <legend className="sr-only">Promotional Techniques</legend>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <Checkbox name="promoTechniques" value="Discount" label="Discount" />
                    <Checkbox name="promoTechniques" value="Special Display" label="Special Display" />
                    <Checkbox name="promoTechniques" value="Coupons or Loyalty Cards" label="Coupons / Loyalty Cards" />
                    <Checkbox name="promoTechniques" value="Product Samples" label="Product Samples" />
                    <Checkbox name="promoTechniques" value="Gifts with Purchase" label="Gifts with Purchase" />
                  </div>
                </fieldset>
            </Section>

            <Section number={8} title="Labelling Details">
                 <fieldset>
                    <legend className="block text-sm font-medium text-gray-700 mb-2">A. Does the label have the following REQUIRED items?</legend>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <Checkbox name="requiredDetails" value="Important Notice" label="Important Notice' or similar" />
                        <Checkbox name="requiredDetails" value="Breastfeeding is Best" label="'Breastfeeding is Best'" />
                        <Checkbox name="requiredDetails" value="Health Hazard Warning" label="Health hazard warning" />
                        <Checkbox name="requiredDetails" value="Use on Advice" label="Statement to use on health worker advice" />
                    </div>
                 </fieldset>
                 <fieldset className="pt-4">
                    <legend className="block text-sm font-medium text-gray-700 mb-2">B. Does the label have any of the following PROHIBITED items?</legend>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <Checkbox name="prohibitedDetails" value="Idealizing Images" label="Pictures of infants or idealizing images" />
                        <Checkbox name="prohibitedDetails" value="Discourages Breastfeeding" label="Text that discourages breastfeeding" />
                    </div>
                 </fieldset>
            </Section>
      
            <Section number={7} title="Upload Evidence">
                <label htmlFor="evidenceFile" className="block text-sm font-medium text-gray-700 mb-2">Attach a Photo, Image, Screenshot, File, Label…</label>
                <input type="file" name="evidenceFile" id="evidenceFile" onChange={handleChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
            </Section>

            <Section number={9} title="Your Details (Confidential)">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                  <input type="text" name="reporterName" value={formData.reporterName} onChange={handleChange} className="w-full p-2 border-gray-300 rounded-md shadow-sm" required/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your E-mail</label>
                  <input type="email" name="reporterEmail" value={formData.reporterEmail} onChange={handleChange} className="w-full p-2 border-gray-300 rounded-md shadow-sm" required/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mobile / Whatsapp</label>
                  <input type="tel" name="reporterMobile" value={formData.reporterMobile} onChange={handleChange} className="w-full p-2 border-gray-300 rounded-md shadow-sm" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <textarea name="reporterAddress" value={formData.reporterAddress} onChange={handleChange} rows={3} className="w-full p-2 border-gray-300 rounded-md shadow-sm" />
                </div>
              </div>
            </Section>

            {/* Submit Button */}
            <div className="pt-6 text-center border-t">
                <button type="submit" className="inline-flex justify-center items-center gap-2 rounded-lg bg-blue-600 px-8 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-blue-500">
                    <span>Submit Report</span> 
                    <ArrowRightIcon className="w-5" />
                </button>
            </div>
        </form>
      </div>
    </main>
  );
}