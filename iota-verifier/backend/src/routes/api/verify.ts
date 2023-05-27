import {
    SubjectHolderRelationship,
    PresentationValidationOptions,
    Resolver,
    FailFast,
    VerifierOptions,
    Presentation,
} from '@iota/identity-wasm/node'

/**
 * @param presentationFile Name of presentation file in `/presentations/`.
 * @param challenge Challenge used when creating the presentation.
 */
async function verify(
    presentationFile: string,
    challenge: string
) {
    const verifiablePresentation = JSON.parse(presentationFile)

    const presentation = Presentation.fromJSON(verifiablePresentation)

    const presentationVerifierOptions = new VerifierOptions({
        challenge,
    })

    const subjectHolderRelationship = SubjectHolderRelationship.AlwaysSubject

    const presentationValidationOptions = new PresentationValidationOptions({
        presentationVerifierOptions: presentationVerifierOptions,
        subjectHolderRelationship: subjectHolderRelationship,
    })

    const resolver = new Resolver()

    try {
        await resolver.verifyPresentation(
            presentation,
            presentationValidationOptions,
            FailFast.FirstError
        )
        console.log(`VP successfully validated`)

        return `VP successfully validated`
    } catch (error) {
        console.log(`VP validation unsuccessful`)

        if (error instanceof Error) {
            console.log(error.message);
        } else {
            console.log('Unexpected error', error);
        }

        return `VP validation unsuccessful`
    }
}

export { verify }