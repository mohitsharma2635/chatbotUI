/**
 * API utility for FHIR API calls
 */

const API_BASE_URL = 'http://10.131.58.59:481/baseR4';

/**
 * Searches for a patient by various criteria
 * @param {Object} params - Search parameters
 * @param {string} params.family - Patient's family name
 * @param {string} params.given - Patient's given name
 * @param {string} params.email - Patient's email
 * @param {string} params.birthdate - Patient's birthdate
 * @param {string} params.gender - Patient's gender
 * @returns {Promise<Object>} Patient search results
 */
export const searchPatient = async ({ family = '', given = '', email = '', birthdate = '', gender = '' }) => {
  try {
    const params = new URLSearchParams();
    if (family) params.append('family', family);
    if (given) params.append('given', given);
    if (email) params.append('email', email);
    if (birthdate) params.append('birthdate', birthdate);
    if (gender) params.append('gender', gender);

    const response = await fetch(`${API_BASE_URL}/Patient?${params.toString()}`);
    if (!response.ok) {
      throw new Error(`Failed to search patient: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching patient:', error);
    throw error;
  }
};

/**
 * Gets conditions for a patient
 * @param {string} subject - Patient ID
 * @param {string} code - Condition code (optional)
 * @returns {Promise<Object>} Condition results
 */
export const getCondition = async (subject, code = '') => {
  try {
    const params = new URLSearchParams();
    params.append('subject', subject);
    if (code) params.append('code', code);

    const response = await fetch(`${API_BASE_URL}/Condition?${params.toString()}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch condition: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching condition:', error);
    throw error;
  }
};

/**
 * Gets procedures for a patient
 * @param {string} subject - Patient ID
 * @param {string} encounter - Encounter ID (optional)
 * @param {string} code - Procedure code (optional)
 * @returns {Promise<Object>} Procedure results
 */
export const getProcedure = async (subject, encounter = '', code = '') => {
  try {
    const params = new URLSearchParams();
    params.append('subject', subject);
    if (encounter) params.append('encounter', encounter);
    if (code) params.append('code', code);

    const response = await fetch(`${API_BASE_URL}/Procedure?${params.toString()}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch procedure: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching procedure:', error);
    throw error;
  }
};

/**
 * Gets encounters for a patient
 * @param {string} subject - Patient ID
 * @returns {Promise<Object>} Encounter results
 */
export const getEncounter = async (subject) => {
  try {
    const response = await fetch(`${API_BASE_URL}/Encounter?subject=${subject}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch encounter: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching encounter:', error);
    throw error;
  }
};

/**
 * Gets observations for a patient
 * @param {string} subject - Patient ID
 * @param {string} code - Observation code (optional)
 * @param {string} encounter - Encounter ID (optional)
 * @returns {Promise<Object>} Observation results
 */
export const getObservations = async (subject, code = '', encounter = '') => {
  try {
    const params = new URLSearchParams();
    params.append('subject', subject);
    if (code) params.append('code', code);
    if (encounter) params.append('encounter', encounter);

    const response = await fetch(`${API_BASE_URL}/Observations?${params.toString()}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch observations: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching observations:', error);
    throw error;
  }
};

/**
 * Gets prescriptions for a patient
 * @param {string} subject - Patient ID
 * @param {string} prescriptionId - Prescription ID (optional)
 * @returns {Promise<Object>} Prescription results
 */
export const getPrescription = async (subject, prescriptionId = '') => {
  try {
    const params = new URLSearchParams();
    params.append('subject', subject);
    if (prescriptionId) params.append('prescriptionId', prescriptionId);

    const response = await fetch(`${API_BASE_URL}/MedicationRequest?${params.toString()}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch prescription: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching prescription:', error);
    throw error;
  }
};

/**
 * Processes user message and calls appropriate API
 * @param {string} userMessage - User's message
 * @returns {Promise<string>} Formatted response message
 */
export const processUserQuery = async (userMessage) => {
  try {
    const message = userMessage.toLowerCase().trim();

    // Simple keyword-based routing
    if (message.includes('search patient') || message.includes('find patient') || message.includes('patient search')) {
      // Extract patient name if provided
      const nameMatch = userMessage.match(/(?:name|patient|family)\s+(?:is\s+)?([A-Za-z]+)/i);
      const family = nameMatch ? nameMatch[1] : '';
      
      const result = await searchPatient({ family });
      const total = result.total || 0;
      const entries = result.entry || [];
      
      if (total === 0) {
        return `No patients found matching your search criteria.`;
      }
      
      return `Found ${total} patient(s). ${entries.length > 0 ? `First patient: ${JSON.stringify(entries[0].resource, null, 2)}` : ''}`;
    }

    if (message.includes('condition') || message.includes('diagnosis')) {
      // Extract patient ID if provided
      const idMatch = userMessage.match(/(?:patient|subject)\s+(?:id\s+)?(\d+)/i);
      const subject = idMatch ? idMatch[1] : '10006'; // Default from example
      
      const result = await getCondition(subject);
      const total = result.total || 0;
      const entries = result.entry || [];
      
      if (total === 0) {
        return `No conditions found for patient ${subject}.`;
      }
      
      return `Found ${total} condition(s) for patient ${subject}. ${entries.length > 0 ? `First condition: ${JSON.stringify(entries[0].resource, null, 2)}` : ''}`;
    }

    if (message.includes('procedure')) {
      // Extract patient ID if provided
      const idMatch = userMessage.match(/(?:patient|subject)\s+(?:id\s+)?(\d+)/i);
      const subject = idMatch ? idMatch[1] : '10117'; // Default from example
      
      const result = await getProcedure(subject);
      const total = result.total || 0;
      const entries = result.entry || [];
      
      if (total === 0) {
        return `No procedures found for patient ${subject}.`;
      }
      
      return `Found ${total} procedure(s) for patient ${subject}. ${entries.length > 0 ? `First procedure: ${JSON.stringify(entries[0].resource, null, 2)}` : ''}`;
    }

    if (message.includes('encounter')) {
      // Extract patient ID if provided
      const idMatch = userMessage.match(/(?:patient|subject)\s+(?:id\s+)?(\d+)/i);
      const subject = idMatch ? idMatch[1] : '10006'; // Default from example
      
      const result = await getEncounter(subject);
      const total = result.total || 0;
      const entries = result.entry || [];
      
      if (total === 0) {
        return `No encounters found for patient ${subject}.`;
      }
      
      return `Found ${total} encounter(s) for patient ${subject}. ${entries.length > 0 ? `First encounter: ${JSON.stringify(entries[0].resource, null, 2)}` : ''}`;
    }

    if (message.includes('observation') || message.includes('lab') || message.includes('test')) {
      // Extract patient ID if provided
      const idMatch = userMessage.match(/(?:patient|subject)\s+(?:id\s+)?(\d+)/i);
      const subject = idMatch ? idMatch[1] : '10011'; // Default from example
      
      const result = await getObservations(subject);
      const total = result.total || 0;
      const entries = result.entry || [];
      
      if (total === 0) {
        return `No observations found for patient ${subject}.`;
      }
      
      return `Found ${total} observation(s) for patient ${subject}. ${entries.length > 0 ? `First observation: ${JSON.stringify(entries[0].resource, null, 2)}` : ''}`;
    }

    if (message.includes('prescription') || message.includes('medication')) {
      // Extract patient ID if provided
      const idMatch = userMessage.match(/(?:patient|subject)\s+(?:id\s+)?(\d+)/i);
      const subject = idMatch ? idMatch[1] : '42458'; // Default from example
      
      const result = await getPrescription(subject);
      const total = result.total || 0;
      const entries = result.entry || [];
      
      if (total === 0) {
        return `No prescriptions found for patient ${subject}.`;
      }
      
      return `Found ${total} prescription(s) for patient ${subject}. ${entries.length > 0 ? `First prescription: ${JSON.stringify(entries[0].resource, null, 2)}` : ''}`;
    }

    // Default help message
    return `I can help you with:
- Patient search (e.g., "search patient name Karketi")
- Conditions (e.g., "get conditions for patient 10006")
- Procedures (e.g., "show procedures for patient 10117")
- Encounters (e.g., "get encounters for patient 10006")
- Observations (e.g., "show observations for patient 10011")
- Prescriptions (e.g., "get prescriptions for patient 42458")

Please specify what you'd like to search for.`;
  } catch (error) {
    console.error('Error processing query:', error);
    return `Sorry, I encountered an error: ${error.message}. Please try again.`;
  }
};

