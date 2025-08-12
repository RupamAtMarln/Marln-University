import React from 'react';
import { ShieldCheck, Info, FileText, CheckCircle } from 'lucide-react';

export default function DataRetentionPolicy() {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-4xl mx-auto">
          {/* Compliance Checklist */}
          <div className="bg-green-50 dark:bg-green-900 rounded-xl p-5 mb-8 border-l-4 border-green-400 dark:border-green-600">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle size={24} className="text-green-600 dark:text-green-400" />
              <span className="font-bold text-lg text-green-800 dark:text-green-200">Compliance Checklist</span>
            </div>
            <div className="mb-2 text-gray-700 dark:text-gray-200 text-base">
              Marln LMS is committed to full compliance with all relevant data protection laws and best practices. We regularly review and update our policies to ensure ongoing alignment.
            </div>
            <ul className="pl-6 text-gray-700 dark:text-gray-200 text-sm space-y-1">
              <li className="flex items-center gap-2"><CheckCircle size={18} className="text-green-600 dark:text-green-400" /> <b>GDPR (EU General Data Protection Regulation)</b> <span className="ml-2 text-xs bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300 px-2 py-0.5 rounded">Compliant</span></li>
              <li className="flex items-center gap-2"><CheckCircle size={18} className="text-green-600 dark:text-green-400" /> <b>Saudi Arabia PDPL (Personal Data Protection Law)</b> <span className="ml-2 text-xs bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300 px-2 py-0.5 rounded">Compliant</span></li>
              <li className="flex items-center gap-2"><CheckCircle size={18} className="text-green-600 dark:text-green-400" /> <b>Shariah Principles</b> <span className="ml-2 text-xs bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300 px-2 py-0.5 rounded">Aligned</span></li>
              <li className="flex items-center gap-2"><CheckCircle size={18} className="text-green-600 dark:text-green-400" /> <b>Best Practices in Data Privacy</b> <span className="ml-2 text-xs bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300 px-2 py-0.5 rounded">Adopted</span></li>
            </ul>
          </div>
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full flex items-center justify-center">
              <ShieldCheck size={32} className="text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-1">Data Retention Policy</h1>
              <div className="text-gray-500 dark:text-gray-300 text-base">How we manage and retain your data in Marln LMS</div>
            </div>
          </div>

          {/* Info Alert */}
          <div className="flex items-start gap-3 bg-blue-50 dark:bg-blue-900 border-l-4 border-blue-400 dark:border-blue-600 rounded p-4 mb-6">
            <Info size={24} className="text-blue-600 dark:text-blue-400 mt-1" />
            <div className="text-gray-700 dark:text-gray-200 text-sm">
              This page summarizes how user and course data is retained and managed in compliance with legal obligations (GDPR). For questions, contact your administrator.
            </div>
          </div>

          {/* Table Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-8">
            <div className="flex items-center gap-2 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
              <FileText size={20} className="text-blue-600 dark:text-blue-400" />
              <span className="font-semibold text-lg text-gray-800 dark:text-gray-100">Retention Details</span>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm rounded-xl">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                    <th className="py-2 px-3 text-left">Area</th>
                    <th className="py-2 px-3 text-left">Category</th>
                    <th className="py-2 px-3 text-left">Purpose</th>
                    <th className="py-2 px-3 text-left">Retention Period</th>
                    <th className="py-2 px-3 text-left">Lawful Bases & Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Row 1 */}
                  <tr className="even:bg-gray-50 even:dark:bg-gray-900 hover:bg-blue-50 hover:dark:bg-blue-900 transition">
                    <td className="py-3 px-3 font-semibold">Site</td>
                    <td className="py-3 px-3">Test Category</td>
                    <td className="py-3 px-3">Test Purpose</td>
                    <td className="py-3 px-3"><span className="inline-block px-2 py-1 rounded bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300 font-semibold">1 year</span></td>
                    <td className="py-3 px-3"><span className="inline-block px-2 py-1 rounded bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300 font-semibold">GDPR Art 6.1(c)</span> Processing is necessary for compliance with a legal obligation to which the controller is subject</td>
                  </tr>
                  {/* Row 2 */}
                  <tr className="even:bg-gray-50 even:dark:bg-gray-900 hover:bg-blue-50 hover:dark:bg-blue-900 transition">
                    <td className="py-3 px-3 font-semibold">Users</td>
                    <td className="py-3 px-3">Test Category</td>
                    <td className="py-3 px-3">Test Purpose</td>
                    <td className="py-3 px-3"><span className="inline-block px-2 py-1 rounded bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300 font-semibold">1 year</span></td>
                    <td className="py-3 px-3"><span className="inline-block px-2 py-1 rounded bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300 font-semibold">GDPR Art 6.1(c)</span> Processing is necessary for compliance with a legal obligation to which the controller is subject</td>
                  </tr>
                  {/* Row 3 */}
                  <tr className="even:bg-gray-50 even:dark:bg-gray-900 hover:bg-blue-50 hover:dark:bg-blue-900 transition">
                    <td className="py-3 px-3 font-semibold">Course categories</td>
                    <td className="py-3 px-3">-</td>
                    <td className="py-3 px-3">-</td>
                    <td className="py-3 px-3"><span className="inline-block px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300 font-semibold">No retention period</span></td>
                    <td className="py-3 px-3">-</td>
                  </tr>
                  {/* Row 4 */}
                  <tr className="even:bg-gray-50 even:dark:bg-gray-900 hover:bg-blue-50 hover:dark:bg-blue-900 transition">
                    <td className="py-3 px-3 font-semibold">Courses</td>
                    <td className="py-3 px-3">-</td>
                    <td className="py-3 px-3">-</td>
                    <td className="py-3 px-3"><span className="inline-block px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300 font-semibold">No retention period</span></td>
                    <td className="py-3 px-3">-</td>
                  </tr>
                  {/* Row 5 */}
                  <tr className="even:bg-gray-50 even:dark:bg-gray-900 hover:bg-blue-50 hover:dark:bg-blue-900 transition">
                    <td className="py-3 px-3 font-semibold">Activity modules</td>
                    <td className="py-3 px-3">-</td>
                    <td className="py-3 px-3">-</td>
                    <td className="py-3 px-3"><span className="inline-block px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300 font-semibold">No retention period</span></td>
                    <td className="py-3 px-3">-</td>
                  </tr>
                  {/* Row 6 */}
                  <tr className="even:bg-gray-50 even:dark:bg-gray-900 hover:bg-blue-50 hover:dark:bg-blue-900 transition">
                    <td className="py-3 px-3 font-semibold">Blocks</td>
                    <td className="py-3 px-3">-</td>
                    <td className="py-3 px-3">-</td>
                    <td className="py-3 px-3"><span className="inline-block px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300 font-semibold">No retention period</span></td>
                    <td className="py-3 px-3">-</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Explanatory Notes */}
          <div className="bg-blue-50 dark:bg-blue-900 rounded-xl p-5 text-gray-700 dark:text-gray-200 text-sm border-l-4 border-blue-400 dark:border-blue-600 mb-8">
            <ul className="list-disc pl-6 mb-2">
              <li>For <b>Site</b> and <b>Users</b>, data falls under "Test Category," with the purpose specified as "Test Purpose." The lawful basis is a legal obligation under GDPR, with a specified retention period of 1 year.</li>
              <li><b>Course categories</b>, <b>Courses</b>, <b>Activity modules</b>, and <b>Blocks</b> have no defined retention period or specified purposes.</li>
            </ul>
            <p>This data matches exactly what was present in your source file, ready for use in your LMS.</p>
          </div>

          {/* Legal Alignment Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-8">
            <div className="flex items-center gap-2 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
              <ShieldCheck size={20} className="text-green-600 dark:text-green-400" />
              <span className="font-semibold text-lg text-gray-800 dark:text-gray-100">Legal Alignment: Saudi Arabia’s PDPL & Shariah Principles</span>
            </div>
            <div className="mb-3 text-gray-600 dark:text-gray-300 text-sm">
              Marln LMS aligns with international and local data protection standards. Below is a mapping of Saudi Arabia’s Personal Data Protection Law (PDPL) principles to corresponding Shariah concepts, ensuring both legal and cultural compliance.
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm rounded-xl">
                <thead>
                  <tr className="bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-200">
                    <th className="py-2 px-3 text-left">PDPL Principle</th>
                    <th className="py-2 px-3 text-left">Shariah Alignment</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="even:bg-gray-50 even:dark:bg-gray-900 hover:bg-green-50 hover:dark:bg-green-900 transition">
                    <td className="py-3 px-3 font-semibold">Lawful and transparent processing</td>
                    <td className="py-3 px-3">Consent and trust (<span className="font-semibold">Amanah</span>)</td>
                  </tr>
                  <tr className="even:bg-gray-50 even:dark:bg-gray-900 hover:bg-green-50 hover:dark:bg-green-900 transition">
                    <td className="py-3 px-3 font-semibold">Purpose limitation</td>
                    <td className="py-3 px-3">Maslahah (use must be beneficial)</td>
                  </tr>
                  <tr className="even:bg-gray-50 even:dark:bg-gray-900 hover:bg-green-50 hover:dark:bg-green-900 transition">
                    <td className="py-3 px-3 font-semibold">Data minimization</td>
                    <td className="py-3 px-3">Prohibition of unnecessary intrusion</td>
                  </tr>
                  <tr className="even:bg-gray-50 even:dark:bg-gray-900 hover:bg-green-50 hover:dark:bg-green-900 transition">
                    <td className="py-3 px-3 font-semibold">Data subject rights (access, correction)</td>
                    <td className="py-3 px-3">Haq al-Khususiyyah and Adalah</td>
                  </tr>
                  <tr className="even:bg-gray-50 even:dark:bg-gray-900 hover:bg-green-50 hover:dark:bg-green-900 transition">
                    <td className="py-3 px-3 font-semibold">Security and confidentiality</td>
                    <td className="py-3 px-3">Darar and Amanah</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
              <b>Note:</b> The PDPL (2021, amended 2023) is Saudi Arabia’s primary data protection law. Its principles are designed to be compatible with Shariah, ensuring both legal and ethical data stewardship in Marln LMS.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 