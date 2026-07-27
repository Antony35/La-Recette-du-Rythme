export type Sequence = {
	id: string;
	data: { title: string; objective: string; order: number };
};

export type Part = {
	id: string;
	data: { order: number; sequence: { id: string } };
};

export type Course = ReturnType<typeof buildCourse>;
export type Flat = ReturnType<typeof flattenCourse>;

type Ordered = {
	data: {
		order: number;
	};
};

const byOrder = (a: Ordered, b: Ordered) => a.data.order - b.data.order;

export const buildCourse = (sequences: Sequence[], parts: Part[]) => {
	return sequences.toSorted(byOrder).map((sequence) => ({
		...sequence,
		parts: parts
			.filter((part) => part.data.sequence.id === sequence.id)
			.toSorted(byOrder),
	}));
};

export const flattenCourse = (course: Course) => {
	return course.flatMap((sequence) => sequence.parts);
};

export const getNeighbours = (parts: Flat, currentId: string) => {
	const index = parts.findIndex((part) => part.id === currentId);

	if (index === -1) {
		throw new Error(`Partie introuvable dans le cours : "${currentId}"`);
	}

	return {
		previous: parts[index - 1],
		next: parts[index + 1],
	};
};
